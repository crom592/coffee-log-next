import Link from "next/link";
import { useSession } from "next-auth/react";
import { useFollow } from "@/hooks/useSocial";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  image: string | null;
  _count: {
    followers: number;
    following: number;
  };
}

interface UserListProps {
  users: User[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  emptyMessage?: string;
}

export function UserList({
  users,
  isLoading,
  isLoadingMore,
  hasMore,
  onLoadMore,
  emptyMessage = "No users found",
}: UserListProps) {
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} currentUser={session?.user} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
}

interface UserCardProps {
  user: User;
  currentUser: User | null | undefined;
}

function UserCard({ user, currentUser }: UserCardProps) {
  const { following, toggleFollow } = useFollow(user.id);
  const isCurrentUser = currentUser?.id === user.id;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <Link
          href={`/users/${user.id}`}
          className="flex items-center space-x-4 flex-1"
        >
          <Avatar>
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{user._count.followers} followers</span>
            </div>
          </div>
        </Link>
        {currentUser && !isCurrentUser && (
          <Button
            variant={following ? "outline" : "default"}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              toggleFollow();
            }}
          >
            {following ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    </Card>
  );
}
