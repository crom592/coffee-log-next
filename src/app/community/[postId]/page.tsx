// src/app/community/[postId]/page.tsx

import { Metadata } from "next";
import { prisma } from "@/lib/prisma"; // Prisma 클라이언트 임포트
import PostPageClient from "./PostPageClient"; // 클라이언트 컴포넌트 임포트

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const postId = params.postId;

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

export default function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  return <PostPageClient postId={params.postId} />;
}