import { useState } from "react";
import useSWR from "swr";
import { CommentWithUser, PaginatedResponse } from "@/types/community";

const COMMENTS_PER_PAGE = 20;

export function useComments(postId: string) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<CommentWithUser>>(
    `/api/posts/${postId}/comments?page=${page}&limit=${COMMENTS_PER_PAGE}`
  );

  const createComment = async (content: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to create comment");

      const comment = await response.json();
      mutate();
      return comment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  const updateComment = async (commentId: string, content: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to update comment");

      const updatedComment = await response.json();
      mutate();
      return updatedComment;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete comment");

      mutate();
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
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
    mutate,
  };
}
