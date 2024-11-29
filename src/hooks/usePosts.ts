import { useState } from "react";
import useSWR from "swr";
import { PostWithRelations, PaginatedResponse } from "@/types/community";

const POSTS_PER_PAGE = 10;

export function usePosts(userId?: string, logId?: string) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<PostWithRelations>>(
    `/api/posts?page=${page}&limit=${POSTS_PER_PAGE}${userId ? `&userId=${userId}` : ""}${
      logId ? `&logId=${logId}` : ""
    }`
  );

  const createPost = async (title: string, content: string, logId: string | null = null) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, logId }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      const post = await response.json();
      mutate();
      return post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
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
    mutate,
  };
}

export function usePost(postId: string) {
  const { data: post, error, isLoading, mutate } = useSWR<PostWithRelations>(
    `/api/posts/${postId}`
  );

  const updatePost = async (title: string, content: string, logId: string | null = null) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, logId }),
      });

      if (!response.ok) throw new Error("Failed to update post");

      const updatedPost = await response.json();
      mutate(updatedPost);
      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      mutate(undefined);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };

  return {
    post,
    isLoading,
    error,
    updatePost,
    deletePost,
    mutate,
  };
}
