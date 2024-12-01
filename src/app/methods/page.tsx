import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import MethodList from '@/components/methods/MethodList';
import Link from 'next/link';

export default async function MethodsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const methods = await prisma.brewMethod.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Brewing Methods</h1>
        <Link
          href="/methods/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add New Method
        </Link>
      </div>
      <MethodList methods={methods} />
    </div>
  );
}
