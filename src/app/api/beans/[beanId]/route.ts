import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const beanId = searchParams.get('beanId');

  if (!beanId) {
    return new Response('Missing bean ID', { status: 400 });
  }

  try {
    const bean = await prisma.bean.findUnique({ where: { id: beanId } });
    if (!bean) {
      return new Response('Bean not found', { status: 404 });
    }

    await prisma.bean.delete({ where: { id: beanId } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting bean:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}