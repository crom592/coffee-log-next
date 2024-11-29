"use client";

import { useBookmarks } from "@/hooks/useBookmarks";
import { PostCard } from "@/components/community/PostCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BookmarksListProps {
  userId: string;
}

export function BookmarksList({ userId }: BookmarksListProps) {
  const {
    posts,
    isEmpty,
    hasMore,
    isLoading,
    isLoadingMore,
    isRefreshing,
    loadMore,
  } = useBookmarks(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        아직 북마크한 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => loadMore()}
            disabled={isLoadingMore}
          >
            {isLoadingMore && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            더 보기
          </Button>
        </div>
      )}
      {isRefreshing && !isLoadingMore && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
