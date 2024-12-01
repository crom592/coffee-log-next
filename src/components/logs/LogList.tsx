import { Log, Bean, BrewMethod } from '@prisma/client';
import Link from 'next/link';
import { format } from 'date-fns';

type LogWithRelations = Log & {
  bean: Bean;
  method: BrewMethod;
};

export default function LogList({ logs }: { logs: LogWithRelations[] }) {
  return (
    <div className="grid gap-6">
      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">{log.bean.name}</h2>
              <p className="text-gray-600">{format(log.createdAt, 'PPP')}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {log.method.name}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-gray-600 text-sm">Temperature</p>
              <p className="font-medium">{log.temperature?.toString()}°C</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Dose</p>
              <p className="font-medium">{log.doseIn?.toString()}g</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Yield</p>
              <p className="font-medium">{log.doseOut?.toString()}g</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Ratio</p>
              <p className="font-medium">1:{log.ratio?.toString()}</p>
            </div>
          </div>
          
          {log.notes && (
            <div className="mt-4">
              <p className="text-gray-700">{log.notes}</p>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <Link
              href={`/logs/${log.id}`}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
