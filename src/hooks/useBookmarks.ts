import useSWRInfinite from "swr/infinite";
import { PostWithRelations } from "@/types/community";

interface BookmarksResponse {
  posts: PostWithRelations[];
  total: number;
  hasMore: boolean;
}

const PAGE_SIZE = 10;

export function useBookmarks(userId: string) {
  const getKey = (pageIndex: number) =>
    `/api/users/${userId}/bookmarks?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<BookmarksResponse>(getKey);

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
