import { User } from "@prisma/client";
import { useFollow } from "@/hooks/useSocial";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, MessageSquare, Users } from "lucide-react";

interface UserProfileProps {
  user: User & {
    _count: {
      followers: number;
      following: number;
      posts: number;
      logs: number;
    };
  };
  currentUser: User | null | undefined;
}

export function UserProfile({ user, currentUser }: UserProfileProps) {
  const { following, toggleFollow } = useFollow(user.id);
  const isCurrentUser = currentUser?.id === user.id;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{user._count.followers} followers</span>
              </div>
              <div>·</div>
              <span>{user._count.following} following</span>
            </div>
          </div>
        </div>
        {currentUser && !isCurrentUser && (
          <Button
            variant={following ? "outline" : "default"}
            onClick={() => toggleFollow()}
          >
            {following ? "Following" : "Follow"}
          </Button>
        )}
      </div>

      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts" className="space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Posts ({user._count.posts})</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="space-x-2">
            <Coffee className="h-4 w-4" />
            <span>Logs ({user._count.logs})</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {/* TODO: Add user's posts */}
        </TabsContent>
        <TabsContent value="logs">
          {/* TODO: Add user's logs */}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
