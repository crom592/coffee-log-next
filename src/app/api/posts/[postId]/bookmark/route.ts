import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getPostId(request: NextRequest): string {
  const segments = request.nextUrl.pathname.split('/');
  const postId = segments[segments.length - 2];
  
  if (!postId || typeof postId !== 'string' || postId.trim() === '') {
    throw new Error("Post ID not found in URL or is empty");
  }
  
  return postId;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const postId = getPostId(request);
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json({ bookmarked: !!bookmark });
  } catch (error) {
    console.error("[BOOKMARK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session.user?.id) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const postId = getPostId(request);
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId,
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
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error("[BOOKMARK_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const postId = getPostId(request)
    if (!postId) {
      return new NextResponse("Invalid Post ID", { status: 400 });
    }
    if (!session.user?.id) {
      return new NextResponse("User ID is required", { status: 400 });
    }
    await prisma.bookmark.delete({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[BOOKMARK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
