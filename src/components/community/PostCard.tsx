import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { PostWithRelations } from "@/types/community";
import { useLike, useBookmark } from "@/hooks/useSocial";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostWithRelations;
}

export function PostCard({ post }: PostCardProps) {
  const { data: session } = useSession();
  const { liked, toggleLike } = useLike(post.id);
  const { bookmarked, toggleBookmark } = useBookmark(post.id);

  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <Link href={`/community/${post.id}`}>
        <CardHeader className="space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user.image ?? undefined} />
              <AvatarFallback>{post.user.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          {session && (
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              onClick={(e) => {
                e.preventDefault();
                toggleLike();
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4 mr-1",
                  liked ? "fill-current text-red-500" : "text-muted-foreground"
                )}
              />
              <span className="text-xs">{post._count?.likes ?? 0}</span>
            </Button>
          )}
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{post._count?.comments ?? 0}</span>
          </div>
        </div>
        {session && (
          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark();
            }}
          >
            <Bookmark
              className={cn(
                "h-4 w-4",
                bookmarked ? "fill-current text-primary" : "text-muted-foreground"
              )}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
