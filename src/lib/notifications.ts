import { prisma } from "./prisma";
import type { NotificationType } from "@prisma/client";

interface CreateNotificationParams {
  type: NotificationType;
  userId: string;
  actorId: string;
  postId?: string;
  commentId?: string;
}

export async function createNotification({
  type,
  userId,
  actorId,
  postId,
  commentId,
}: CreateNotificationParams) {
  // Don't create notification if user is acting on their own content
  if (userId === actorId) {
    return null;
  }

  return prisma.notification.create({
    data: {
      type,
      userId,
      actorId,
      postId,
      commentId,
    },
  });
}
