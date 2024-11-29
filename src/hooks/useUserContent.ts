import useSWRInfinite from 'swr/infinite';
import { PostWithRelations } from "@/types/community";
import { Log } from "@prisma/client";

interface UserPostsResponse {
  posts: PostWithRelations[];
  total: number;
  hasMore: boolean;
}

interface UserLogsResponse {
  logs: Log[];
  total: number;
  hasMore: boolean;
}

const PAGE_SIZE = 10;

export function useUserPosts(userId: string) {
  const getKey = (pageIndex: number) =>
    `/api/users/${userId}/posts?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<UserPostsResponse>(getKey);

  const posts = data ? data.flatMap((page) => page.posts) : [];
  const total = data?.[0]?.total ?? 0;
  const hasMore = data ? data[data.length - 1]?.hasMore : true;
  const isEmpty = posts.length === 0;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;

  return {
    posts,
    total,
    error,
    isEmpty,
    hasMore,
    isLoading,
    isLoadingMore,
    isRefreshing,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}

export function useUserLogs(userId: string) {
  const getKey = (pageIndex: number) =>
    `/api/users/${userId}/logs?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<UserLogsResponse>(getKey);

  const logs = data ? data.flatMap((page) => page.logs) : [];
  const total = data?.[0]?.total ?? 0;
  const hasMore = data ? data[data.length - 1]?.hasMore : true;
  const isEmpty = logs.length === 0;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;

  return {
    logs,
    total,
    error,
    isEmpty,
    hasMore,
    isLoading,
    isLoadingMore,
    isRefreshing,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}
