"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function NotificationList() {
  const { notifications, isLoading, markAllAsRead } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!notifications?.length) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        새로운 알림이 없습니다.
      </div>
    );
  }

  const hasUnread = notifications.some((notification) => !notification.read);

  return (
    <div className="space-y-4">
      {hasUnread && (
        <div className="flex justify-end px-4">
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            모두 읽음 표시
          </Button>
        </div>
      )}
      <div className="space-y-1">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}
