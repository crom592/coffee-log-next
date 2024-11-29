import { SWRResponse } from 'swr';
import { default as useSWR } from 'swr';
import { toast } from "sonner";

export function useLike(postId: string) {
  const { data, error, mutate } = useSWR<{ liked: boolean }>(
    `/api/posts/${postId}/like`
  );

  const toggleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to toggle like");

      mutate();
      return response.status === 200;
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("좋아요 처리에 실패했습니다");
      throw error;
    }
  };

  return {
    liked: data?.liked ?? false,
    isLoading: !error && !data,
    error,
    toggleLike,
  };
}

export function useBookmark(postId: string) {
  const { data, error, mutate } = useSWR<{ bookmarked: boolean }>(
    `/api/posts/${postId}/bookmark`
  );

  const toggleBookmark = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/bookmark`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to toggle bookmark");

      mutate();
      return response.status === 200;
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("북마크 처리에 실패했습니다");
      throw error;
    }
  };

  return {
    bookmarked: data?.bookmarked ?? false,
    isLoading: !error && !data,
    error,
    toggleBookmark,
  };
}

export function useFollow(userId: string) {
  const { data, error, mutate } = useSWR<{ following: boolean }>(
    `/api/users/${userId}/follow`
  );

  const toggleFollow = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/follow`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to toggle follow");

      mutate();
      return response.status === 200;
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("팔로우 처리에 실패했습니다");
      throw error;
    }
  };

  return {
    following: data?.following ?? false,
    isLoading: !error && !data,
    error,
    toggleFollow,
  };
}
