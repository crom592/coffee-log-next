import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const [beans, methods, recentLogs] = await Promise.all([
    prisma.bean.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.brewMethod.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.log.findMany({
      where: { userId: session.user.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        bean: true,
        method: true
      }
    })
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-12">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'Profile'}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{session.user.name}</h1>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link
          href="/logs/new"
          className="bg-green-600 text-white rounded-lg p-6 hover:bg-green-700 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">New Entry</h2>
          <p className="text-green-100">Log your latest brew</p>
        </Link>
        
        <Link
          href="/logs"
          className="bg-green-100 rounded-lg p-6 hover:bg-green-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Brewing History</h2>
          <p className="text-green-800">View all your logs</p>
        </Link>
        
        <Link
          href="/beans"
          className="bg-green-100 rounded-lg p-6 hover:bg-green-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Coffee Beans</h2>
          <p className="text-green-800">{beans.length} beans registered</p>
        </Link>
        
        <Link
          href="/methods"
          className="bg-green-100 rounded-lg p-6 hover:bg-green-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Brewing Methods</h2>
          <p className="text-green-800">{methods.length} methods available</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recent Brews</h2>
        <div className="grid gap-4">
          {recentLogs.map((log) => (
            <Link
              key={log.id}
              href={`/logs/${log.id}`}
              className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{log.bean.name}</h3>
                  <p className="text-gray-600 text-sm">{log.method.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
