import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return new NextResponse(null, { status: 204 });
    }

    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        postId: params.postId,
      },
    });

    return NextResponse.json(like);
  } catch (error) {
    console.error("[LIKE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.postId,
        },
      },
    });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error("[LIKE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
