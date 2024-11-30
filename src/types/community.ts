import { Bean, BrewMethod, Log, User } from "@prisma/client";

export type PostWithRelations = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  logId: string | null;
  user: Pick<User, "id" | "name" | "image">;
  log?: {
    bean: Bean;
    method: BrewMethod;
  } & Log;
  _count?: {
    comments: number;
    likes: number;
  };
};

export type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;
  user: Pick<User, "id" | "name" | "image">;
};

export type PaginatedResponse<T> = {
  total: number;
  page: number;
  totalPages: number;
  data: T[];
};
