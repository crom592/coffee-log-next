import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FollowTabs } from "@/components/users/FollowTabs";

interface PageParams {
  userId: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      title: "User not found",
    };
  }

  return {
    title: `${user.name}'s Follows - Coffee Log`,
  };
}

export default async function FollowsPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">{user.name}'s Network</h1>
      <FollowTabs 
        userId={userId}
        followerCount={user._count.followers}
        followingCount={user._count.following}
      />
    </div>
  );
}