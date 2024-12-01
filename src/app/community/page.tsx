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
          <h1 className="text-3xl font-bold">Community</h1>
          {session && (
            <Button variant="default" className="bg-[#1B4332] hover:bg-[#143728] text-white">
              <Link href="/community/new" className="flex items-center">
                <PenSquare className="h-4 w-4 mr-2" />
                New Post
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
            <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
            <p className="text-muted-foreground mb-4">
              Why not write the first post?
            </p>
            {session ? (
              <Button variant="default" className="bg-[#1B4332] hover:bg-[#143728] text-white">
                <Link href="/community/new" className="flex items-center">
                  <PenSquare className="h-4 w-4 mr-2" />
                  New Post
                </Link>
              </Button>
            ) : (
              <Button variant="default" className="bg-[#1B4332] hover:bg-[#143728] text-white">
                <Link href="/auth/signin">Sign in to get started</Link>
              </Button>
            )}
          </Card>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
