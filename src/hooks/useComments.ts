import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentWithUser, PaginatedResponse } from "@/types/community";

const COMMENTS_PER_PAGE = 20;

export function useComments(postId: string) {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const queryKey = ["comments", postId, page];

  const { data, error, isLoading } = useQuery<PaginatedResponse<CommentWithUser>>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}/comments?page=${page}&limit=${COMMENTS_PER_PAGE}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      return response.json();
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to create comment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: string; content: string }) => {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to update comment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error updating comment:", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete comment");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  const createComment = async (content: string) => {
    return createCommentMutation.mutateAsync(content);
  };

  const updateComment = async (commentId: string, content: string) => {
    return updateCommentMutation.mutateAsync({ commentId, content });
  };

  const deleteComment = async (commentId: string) => {
    return deleteCommentMutation.mutateAsync(commentId);
  };

  return {
    comments: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage: page,
    setPage,
    isLoading,
    error,
    createComment,
    updateComment,
    deleteComment,
  };
}
