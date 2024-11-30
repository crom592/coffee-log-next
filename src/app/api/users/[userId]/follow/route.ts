import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

function getUserId(request: NextRequest): string {
  const segments = request.nextUrl.pathname.split('/');
  return segments[segments.length - 2] || ''; // Get userId from /api/users/[userId]/follow
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const followerId = session.user.id;
    const followingId = getUserId(request);

    if (!followerId || !followingId) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    if (followerId === followingId) {
      return new NextResponse("Cannot follow yourself", { status: 400 });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      return new NextResponse("Already following", { status: 400 });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
      include: {
        following: true,
      },
    });

    // Create notification
    await createNotification({
      userId: followingId,
      type: "FOLLOW",
      actorId: followerId,
    });

    return NextResponse.json(follow);
  } catch (error) {
    console.error("[FOLLOW_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const followerId = session.user.id;
    const followingId = getUserId(request);

    if (!followerId || !followingId) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return NextResponse.json({ following: !!follow });
  } catch (error) {
    console.error("[FOLLOW_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
