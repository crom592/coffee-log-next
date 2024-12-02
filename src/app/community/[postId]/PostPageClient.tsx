// src/app/community/[postId]/PostPageClient.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { usePost } from "@/hooks/usePosts";
import { CommentList } from "@/components/community/CommentList";
import { PostForm } from "@/components/community/PostForm";
import { LogCard } from "@/components/community/LogCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';

interface PostPageClientProps {
  params: {
    postId: string;
  }
}

export default function PostPageClient({ params }: PostPageClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { post, isLoading, updatePost, deletePost } = usePost(params.postId);
  const [isEditing, setIsEditing] = useState(false);

  // 기존의 클라이언트 로직을 여기에 포함합니다.

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // 게시글이 없을 경우 처리
  if (!post) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Post not found</h2>
            <p className="text-muted-foreground mb-4">
              This post has been deleted or does not exist
            </p>
            <Button onClick={() => router.push("/community")}>
              Back to Community
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // 게시글 수정 및 삭제 핸들러 정의
  const handleEdit = async (title: string, content: string, logId: string | null) => {
    try {
      await updatePost(title, content, logId);
      setIsEditing(false);
      toast.success("Post updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost();
      router.push("/community");
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post");
    }
  };

  // 편집 모드 처리
  if (isEditing) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
          <PostForm
            onSubmit={handleEdit}
            defaultValues={{
              title: post.title,
              content: post.content,
              logId: post.logId,
            }}
            submitLabel="Save"
          />
        </div>
      </div>
    );
  }

  // 게시글 표시
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={post.user.image ?? undefined} />
                  <AvatarFallback>{post.user.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              {session?.user?.id === post.userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={handleDelete}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="prose max-w-none">
              <p>{post.content}</p>
            </div>

            {post.log && (
              <div className="mt-8">
                <LogCard log={post.log} />
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Comments</h2>
              <CommentList postId={post.id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}