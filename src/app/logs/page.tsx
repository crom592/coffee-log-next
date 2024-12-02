'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import LogList from '@/components/logs/LogList';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF7F2]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif text-[#1B4332]">My Brewing Logs</h1>
            <Link href="/logs/new">
              <Button variant="default" className="bg-[#1B4332] hover:bg-[#143728] text-white">
                New Log
              </Button>
            </Link>
          </div>
          <LogList logs={logs} />
        </div>
      </main>
    </>
  );
}
