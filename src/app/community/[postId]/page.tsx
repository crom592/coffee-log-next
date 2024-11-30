"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Metadata, PageProps } from "next";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const postId = params.postId as string;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: true,
    },
  });

  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
  };
}

export default async function PostPage({
  params,
}: PageProps) {
  const postId = params.postId as string;

  const router = useRouter();
  const { data: session } = useSession();
  const { post, isLoading, updatePost, deletePost } = usePost(postId);
  const [isEditing, setIsEditing] = useState(false);

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

  if (!post) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">게시글을 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-4">
              삭제되었거나 존재하지 않는 게시글입니다
            </p>
            <Button onClick={() => router.push("/community")}>
              커뮤니티로 돌아가기
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleEdit = async (title: string, content: string, logId: string | null) => {
    try {
      await updatePost({ title, content, logId });
      setIsEditing(false);
      toast.success("게시글이 수정되었습니다");
    } catch (error) {
      console.error(error);
      toast.error("게시글 수정에 실패했습니다");
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      await deletePost();
      router.push("/community");
      toast.success("게시글이 삭제되었습니다");
    } catch (error) {
      console.error(error);
      toast.error("게시글 삭제에 실패했습니다");
    }
  };

  if (isEditing) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">게시글 수정</h1>
          <PostForm
            onSubmit={handleEdit}
            defaultValues={{
              title: post.title,
              content: post.content,
              logId: post.logId,
            }}
            submitLabel="수정"
          />
        </div>
      </div>
    );
  }

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
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={handleDelete}
                    >
                      삭제
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
                {(() => {
                  const log = {
                    ...post.log,
                    bean: {
                      ...post.log.bean,
                      origin: post.log.bean.origin || "", // Default to empty string if null
                    },
                  };
                  return <LogCard log={log} />;
                })()}
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">댓글</h2>
              <CommentList postId={post.id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}