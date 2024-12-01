import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PostWithRelations, PaginatedResponse } from "@/types/community";
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';

const POSTS_PER_PAGE = 10;

export function usePosts(userId?: string, logId?: string) {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const queryKey = ["posts", { page, userId, logId }];

  const { data, error, isLoading } = useQuery<PaginatedResponse<PostWithRelations>>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(
        `/api/posts?page=${page}&limit=${POSTS_PER_PAGE}${userId ? `&userId=${userId}` : ""}${
          logId ? `&logId=${logId}` : ""
        }`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async ({
      title,
      content,
      logId,
    }: {
      title: string;
      content: string;
      logId: string | null;
    }) => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, logId }),
      });

      if (!response.ok) throw new Error("Failed to create post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const createPost = async (title: string, content: string, logId: string | null = null) => {
    return createPostMutation.mutateAsync({ title, content, logId });
  };

  return {
    posts: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage: page,
    setPage,
    isLoading,
    error,
    createPost,
  };
}

export function usePost(postId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["post", postId];

  const { data: post, error, isLoading } = useQuery<PostWithRelations>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return response.json();
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({
      title,
      content,
      logId,
    }: {
      title: string;
      content: string;
      logId: string | null;
    }) => {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, logId }),
      });

      if (!response.ok) throw new Error("Failed to update post");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const updatePost = async (title: string, content: string, logId: string | null = null) => {
    return updatePostMutation.mutateAsync({ title, content, logId });
  };

  const deletePost = async () => {
    return deletePostMutation.mutateAsync();
  };

  return {
    post,
    isLoading,
    error,
    updatePost,
    deletePost,
  };
}
