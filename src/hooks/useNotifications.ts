import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

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
  const { data, error, mutate } = useSWR<Notification[]>(
    "/api/notifications",
    fetcher
  );

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
      });
      mutate();
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return {
    notifications: data,
    isLoading: !error && !data,
    isError: error,
    markAllAsRead,
    mutate,
  };
}
