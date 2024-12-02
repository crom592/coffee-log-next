import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { EditLogForm } from './EditLogForm';

export default async function EditLogPage({
  params,
}: {
  params: { id: string };
}) {
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

  // Check if the log belongs to the user
  if (log.userId !== session.user.id) {
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
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-serif text-[#1B4332] mb-6">로그 수정하기</h1>
        <EditLogForm log={sanitizedLog} />
      </div>
    </div>
  );
}
