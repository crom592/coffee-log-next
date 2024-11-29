"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "@/components/community/PostCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, PenSquare } from "lucide-react";
import Header from "@/components/Header";

export default function CommunityPage() {
  const { data: session } = useSession();
  const { posts, totalPages, currentPage, setPage, isLoading } = usePosts();

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">커뮤니티</h1>
          {session && (
            <Button asChild>
              <Link href="/community/new">
                <PenSquare className="h-4 w-4 mr-2" />
                새 글 작성
              </Link>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">아직 게시글이 없습니다</h2>
            <p className="text-muted-foreground mb-4">
              첫 번째 게시글을 작성해보세요!
            </p>
            {session ? (
              <Button asChild>
                <Link href="/community/new">
                  <PenSquare className="h-4 w-4 mr-2" />
                  새 글 작성
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">로그인하고 시작하기</Link>
              </Button>
            )}
          </Card>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
