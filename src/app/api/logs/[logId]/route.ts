import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { logId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const log = await prisma.log.findUnique({
      where: {
        id: params.logId,
      },
      include: {
        bean: true,
        method: true,
      },
    });

    if (!log) {
      return new NextResponse('Log not found', { status: 404 });
    }

    // Check if the log belongs to the user
    if (log.userId !== session.user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error fetching log:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { logId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const log = await prisma.log.findUnique({
      where: {
        id: params.logId,
      },
    });

    if (!log) {
      return new NextResponse('Log not found', { status: 404 });
    }

    // Check if the log belongs to the user
    if (log.userId !== session.user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    await prisma.log.delete({
      where: {
        id: params.logId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting log:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { logId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const log = await prisma.log.findUnique({
      where: {
        id: params.logId,
      },
    });

    if (!log) {
      return new NextResponse('Log not found', { status: 404 });
    }

    // Check if the log belongs to the user
    if (log.userId !== session.user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const updatedLog = await prisma.log.update({
      where: {
        id: params.logId,
      },
      data: body,
      include: {
        bean: true,
        method: true,
      },
    });

    return NextResponse.json(updatedLog);
  } catch (error) {
    console.error('Error updating log:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
