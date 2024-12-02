'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { LogPageClient } from './LogPageClient';
import Header from '@/components/Header';

export default async function LogPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    notFound();
  }

  const log = await prisma.log.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      bean: true,
      method: true,
    },
  });

  if (!log) {
    notFound();
  }

  // Convert Decimal types to numbers for client components
  const sanitizedLog = {
    ...log,
    temperature: log.temperature ? Number(log.temperature) : null,
    doseIn: log.doseIn ? Number(log.doseIn) : null,
    doseOut: log.doseOut ? Number(log.doseOut) : null,
    ratio: log.ratio ? Number(log.ratio) : null,
    tds: log.tds ? Number(log.tds) : null,
    extractionYield: log.extractionYield ? Number(log.extractionYield) : null,
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF7F2]">
        <LogPageClient log={sanitizedLog} />
      </main>
    </>
  );
}
