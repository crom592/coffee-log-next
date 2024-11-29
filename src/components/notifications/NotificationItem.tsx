"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Notification } from "@/hooks/useNotifications";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { actor, type, createdAt, post, read } = notification;

  const getNotificationText = () => {
    switch (type) {
      case "LIKE":
        return "님이 회원님의 게시글을 좋아합니다";
      case "COMMENT":
        return "님이 회원님의 게시글에 댓글을 남겼습니다";
      case "FOLLOW":
        return "님이 회원님을 팔로우하기 시작했습니다";
      default:
        return "";
    }
  };

  const getNotificationLink = () => {
    switch (type) {
      case "LIKE":
      case "COMMENT":
        return `/posts/${post?.id}`;
      case "FOLLOW":
        return `/users/${actor.id}`;
      default:
        return "#";
    }
  };

  return (
    <Link
      href={getNotificationLink()}
      className={cn(
        "flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors",
        !read && "bg-muted/30"
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={actor.image ?? undefined} />
        <AvatarFallback>{actor.name?.[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">{actor.name}</span>
          {getNotificationText()}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
            locale: ko,
          })}
        </p>
      </div>
    </Link>
  );
}
