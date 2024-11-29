import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FollowTabs } from "@/components/users/FollowTabs";

interface FollowsPageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({
  params,
}: FollowsPageProps): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name}'s Followers & Following - Coffee Log`,
    description: `View ${user.name}'s followers and following on Coffee Log`,
  };
}

export default async function FollowsPage({ params }: FollowsPageProps) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">{user.name}</h1>
      <FollowTabs
        userId={user.id}
        followerCount={user._count.followers}
        followingCount={user._count.following}
      />
    </div>
  );
}
