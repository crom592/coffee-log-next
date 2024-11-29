import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UserProfile } from "@/components/users/UserProfile";

interface UserPageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name} - Coffee Log`,
    description: `${user.name}'s profile on Coffee Log`,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
          logs: true,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-8">
      <UserProfile user={user} currentUser={session?.user} />
    </div>
  );
}
