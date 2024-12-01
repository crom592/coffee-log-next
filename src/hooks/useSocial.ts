import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';

export function useLike(postId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["like", postId];

  const { data, isLoading, error } = useQuery<{ liked: boolean }>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}/like`);
      if (!response.ok) throw new Error("Failed to fetch like status");
      return response.json();
    }
  });

  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to toggle like");
      return response.status === 200;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error("Error toggling like:", error);
      toast.error("좋아요 처리에 실패했습니다");
    }
  });

  return {
    liked: data?.liked ?? false,
    isLoading,
    error,
    toggleLike,
  };
}

export function useBookmark(postId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["bookmark", postId];

  const { data, isLoading, error } = useQuery<{ bookmarked: boolean }>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}/bookmark`);
      if (!response.ok) throw new Error("Failed to fetch bookmark status");
      return response.json();
    }
  });

  const { mutateAsync: toggleBookmark } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/posts/${postId}/bookmark`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to toggle bookmark");
      return response.status === 200;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error("Error toggling bookmark:", error);
      toast.error("북마크 처리에 실패했습니다");
    }
  });

  return {
    bookmarked: data?.bookmarked ?? false,
    isLoading,
    error,
    toggleBookmark,
  };
}

export function useFollow(userId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["follow", userId];

  const { data, isLoading, error } = useQuery<{ following: boolean }>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/follow`);
      if (!response.ok) throw new Error("Failed to fetch follow status");
      return response.json();
    }
  });

  const { mutateAsync: toggleFollow } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/users/${userId}/follow`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to toggle follow");
      return response.status === 200;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error("Error toggling follow:", error);
      toast.error("팔로우 처리에 실패했습니다");
    }
  });

  return {
    following: data?.following ?? false,
    isLoading,
    error,
    toggleFollow,
  };
}
