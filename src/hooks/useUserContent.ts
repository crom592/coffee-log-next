import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
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
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<UserPostsResponse>({
    queryKey: ['userPosts', userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/users/${userId}/posts?page=${pageParam}&limit=${PAGE_SIZE}`
      );
      if (!response.ok) throw new Error('Failed to fetch user posts');
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length + 1;
    },
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const total = data?.pages[0]?.total ?? 0;
  const isEmpty = posts.length === 0;

  return {
    posts,
    total,
    error,
    isEmpty,
    hasMore: hasNextPage,
    isLoading: status === 'loading',
    isLoadingMore: isFetchingNextPage,
    isRefreshing: isFetching && !isFetchingNextPage,
    loadMore: fetchNextPage,
  };
}

export function useUserLogs(userId: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<UserLogsResponse>({
    queryKey: ['userLogs', userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/users/${userId}/logs?page=${pageParam}&limit=${PAGE_SIZE}`
      );
      if (!response.ok) throw new Error('Failed to fetch user logs');
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length + 1;
    },
  });

  const logs = data?.pages.flatMap((page) => page.logs) ?? [];
  const total = data?.pages[0]?.total ?? 0;
  const isEmpty = logs.length === 0;

  return {
    logs,
    total,
    error,
    isEmpty,
    hasMore: hasNextPage,
    isLoading: (status as UseInfiniteQueryResult<UserLogsResponse>['status']) === 'loading',
    isLoadingMore: isFetchingNextPage,
    isRefreshing: isFetching && !isFetchingNextPage,
    loadMore: fetchNextPage,
  };
}
