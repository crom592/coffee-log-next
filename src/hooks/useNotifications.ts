import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';

export interface Notification {
  id: string;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  read: boolean;
  createdAt: string;
  actor: {
    id: string;
    name: string | null;
    image: string | null;
  };
  post?: {
    id: string;
    title: string;
  };
  comment?: {
    id: string;
    content: string;
  };
}

export function useNotifications() {
  const queryClient = useQueryClient();
  const queryKey = ["notifications"];

  const { data, error, isLoading } = useQuery<Notification[]>({
    queryKey,
    queryFn: () => fetcher("/api/notifications"),
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to mark notifications as read");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error("Error marking notifications as read:", error);
    },
  });

  const markAllAsRead = async () => {
    return markAllAsReadMutation.mutateAsync();
  };

  return {
    notifications: data,
    isLoading,
    isError: error,
    markAllAsRead,
  };
}
