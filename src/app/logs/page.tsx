'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import LogList from '@/components/logs/LogList';
import { redirect } from 'next/navigation';

export default async function LogsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const logs = await prisma.log.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      bean: true,
      method: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Brewing Logs</h1>
      </div>
      <LogList logs={logs} />
    </div>
  );
}
