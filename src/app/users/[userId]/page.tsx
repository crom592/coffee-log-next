import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserProfile } from "@/components/users/UserProfile";

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
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name} - Coffee Log`,
    description: `${user.name}'s profile on Coffee Log`,
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { userId } = await params;
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: userId },
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

  const currentUser = session?.user ? {
    id: session.user.id || '', 
    name: session.user.name ?? null, 
    email: session.user.email ?? null, 
    emailVerified: null,
    image: session.user.image ?? null, 
    createdAt: new Date(),
    updatedAt: new Date(),
  } : null;

  return (
    <div className="container max-w-4xl py-8">
      <UserProfile user={user} currentUser={currentUser} />
    </div>
  );
}
