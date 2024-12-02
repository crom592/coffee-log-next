import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { BeansClient } from './BeansClient';

export const metadata: Metadata = {
  title: 'My Coffee Beans - Coffee Log',
  description: 'Manage your coffee beans collection',
};

export default async function BeansPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const beans = await prisma.bean.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return <BeansClient initialBeans={beans} />;
}
