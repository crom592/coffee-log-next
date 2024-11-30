import { Metadata, PageProps } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FollowTabs } from "@/components/users/FollowTabs";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const userId = params.userId as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
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

export default async function FollowsPage({
  params,
  searchParams,
}: PageProps) {
  const userId = params.userId as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
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