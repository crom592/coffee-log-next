import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { LogPageClient } from './LogPageClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function LogPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    notFound();
  }

  const log = await prisma.log.findUnique({
    where: {
      id: params.id,
    },
    include: {
      bean: true,
      method: true,
    },
  });

  if (!log) {
    notFound();
  }

  // Convert Decimal types to numbers
  const sanitizedLog = {
    ...log,
    temperature: log.temperature ? Number(log.temperature) : null,
    doseIn: log.doseIn ? Number(log.doseIn) : null,
    doseOut: log.doseOut ? Number(log.doseOut) : null,
    ratio: log.ratio ? Number(log.ratio) : null,
    tds: log.tds ? Number(log.tds) : null,
    extractionYield: log.extractionYield ? Number(log.extractionYield) : null,
    method: {
      ...log.method,
      defaultDose: log.method.defaultDose ? Number(log.method.defaultDose) : null,
      defaultRatio: log.method.defaultRatio ? Number(log.method.defaultRatio) : null,
      defaultTemp: log.method.defaultTemp ? Number(log.method.defaultTemp) : null,
    }
  };

  return <LogPageClient log={sanitizedLog} />;
}
