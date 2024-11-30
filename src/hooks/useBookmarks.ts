import { useInfiniteQuery } from "@tanstack/react-query";
import { PostWithRelations } from "@/types/community";

interface BookmarksResponse {
  posts: PostWithRelations[];
  total: number;
  hasMore: boolean;
}

const PAGE_SIZE = 10;

export function useBookmarks(userId: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<BookmarksResponse>({
    queryKey: ["bookmarks", userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/users/${userId}/bookmarks?page=${pageParam}&limit=${PAGE_SIZE}`
      );
      if (!response.ok) throw new Error("Failed to fetch bookmarks");
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
    isLoading: status === "loading",
    isLoadingMore: isFetchingNextPage,
    isRefreshing: isFetching && !isFetchingNextPage,
    loadMore: fetchNextPage,
  };
}
