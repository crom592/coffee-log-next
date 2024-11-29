import useSWRInfinite from 'swr/infinite';
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
  const getKey = (pageIndex: number) =>
    `/api/users/${userId}/followers?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<FollowsResponse>(getKey);

  const followers = data ? data.flatMap((page) => page.followers ?? []) : [];
  const total = data?.[0]?.total ?? 0;
  const hasMore = data ? data[data.length - 1]?.hasMore : true;
  const isEmpty = followers.length === 0;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;

  return {
    followers,
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

export function useFollowing(userId: string) {
  const getKey = (pageIndex: number) =>
    `/api/users/${userId}/following?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<FollowsResponse>(getKey);

  const following = data ? data.flatMap((page) => page.following ?? []) : [];
  const total = data?.[0]?.total ?? 0;
  const hasMore = data ? data[data.length - 1]?.hasMore : true;
  const isEmpty = following.length === 0;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;

  return {
    following,
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
