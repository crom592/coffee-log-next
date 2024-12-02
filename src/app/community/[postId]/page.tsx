// src/app/community/[postId]/page.tsx

import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PostPageClient from "./PostPageClient";

interface PageParams {
  postId: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { postId } = await params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: true,
    },
  });

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} - Coffee Log`,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { postId } = await params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: true,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }
  
  return <PostPageClient params={{ postId: post.id }} />;
}