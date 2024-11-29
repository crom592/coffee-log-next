import { useFollowers, useFollowing } from "@/hooks/useFollows";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserList } from "@/components/users/UserList";

interface FollowTabsProps {
  userId: string;
  followerCount: number;
  followingCount: number;
}

export function FollowTabs({
  userId,
  followerCount,
  followingCount,
}: FollowTabsProps) {
  const { followers, hasNextFollowersPage, loadMoreFollowers } = useFollowers(userId);

  const { following, hasNextFollowingPage, loadMoreFollowing } = useFollowing(userId);

  return (
    <Tabs defaultValue="followers" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="followers">
          Followers ({followerCount})
        </TabsTrigger>
        <TabsTrigger value="following">
          Following ({followingCount})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followers">
        <UserList
          users={followers}
          isLoading={false}
          isLoadingMore={false}
          hasMore={hasNextFollowersPage}
          onLoadMore={loadMoreFollowers}
          emptyMessage="아직 팔로워가 없습니다"
        />
      </TabsContent>
      <TabsContent value="following">
        <UserList
          users={following}
          isLoading={false}
          isLoadingMore={false}
          hasMore={hasNextFollowingPage}
          onLoadMore={loadMoreFollowing}
          emptyMessage="아직 팔로우하는 사용자가 없습니다"
        />
      </TabsContent>
    </Tabs>
  );
}
