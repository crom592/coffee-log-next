'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditLogForm } from './EditLogForm';
import Header from '@/components/Header';

export default async function EditLogPage({ params }: { params: { id: string } }) {
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

  const beans = await prisma.bean.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const methods = await prisma.brewMethod.findMany({
    where: {
      userId: session.user.id,
    },
  });

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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif text-[#1B4332] mb-8">Edit Log</h1>
          <EditLogForm log={sanitizedLog} beans={beans} methods={methods} />
        </div>
      </main>
    </>
  );
}
