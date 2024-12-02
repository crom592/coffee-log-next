import { useInfiniteQuery } from '@tanstack/react-query';
import { User } from "@prisma/client";

interface UserWithFollowCounts extends Pick<User, "id" | "name" | "image"> {
  _count: {
    followers: number;
    following: number;
  };
}

interface FollowsResponse {
  followers?: UserWithFollowCounts[];
  following?: UserWithFollowCounts[];
  total: number;
  hasMore: boolean;
}

const PAGE_SIZE = 20;

export function useFollowers(userId: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<FollowsResponse>({
    queryKey: ['followers', userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/users/${userId}/followers?page=${pageParam}&limit=${PAGE_SIZE}`
      );
      if (!response.ok) throw new Error('Failed to fetch followers');
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
  });

  const followers = data?.pages.flatMap((page) => page.followers ?? []) ?? [];
  const total = data?.pages[0]?.total ?? 0;
  const isEmpty = followers.length === 0;

  return {
    followers,
    total,
    error,
    isEmpty,
    hasMore: hasNextPage,
    isLoading: status === 'pending',
    isLoadingMore: isFetchingNextPage,
    isRefreshing: isFetching && !isFetchingNextPage,
    loadMore: fetchNextPage,
  };
}

export function useFollowing(userId: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<FollowsResponse>({
    queryKey: ['following', userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/users/${userId}/following?page=${pageParam}&limit=${PAGE_SIZE}`
      );
      if (!response.ok) throw new Error('Failed to fetch following');
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
  });

  const following = data?.pages.flatMap((page) => page.following ?? []) ?? [];
  const total = data?.pages[0]?.total ?? 0;
  const isEmpty = following.length === 0;

  return {
    following,
    total,
    error,
    isEmpty,
    hasMore: hasNextPage,
    isLoading: status === 'pending',
    isLoadingMore: isFetchingNextPage,
    isRefreshing: isFetching && !isFetchingNextPage,
    loadMore: fetchNextPage,
  };
}
