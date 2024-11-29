import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id as string,
          postId: params.postId,
        },
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });
      return new NextResponse(null, { status: 204 });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: session.user.id as string,
        postId: params.postId,
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error("[BOOKMARK_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id as string,
          postId: params.postId,
        },
      },
    });

    return NextResponse.json({ bookmarked: !!bookmark });
  } catch (error) {
    console.error("[BOOKMARK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
