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
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-serif text-[#1B4332] mb-2">{log.bean.name}</h2>
              <p className="text-gray-600">{format(log.createdAt, 'PPP')}</p>
            </div>
            <span className="inline-block bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">
              {log.method.name}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Temperature</p>
              <p className="font-medium text-[#1B4332]">{log.temperature?.toString()}°C</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Dose</p>
              <p className="font-medium text-[#1B4332]">{log.doseIn?.toString()}g</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Yield</p>
              <p className="font-medium text-[#1B4332]">{log.doseOut?.toString()}g</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Ratio</p>
              <p className="font-medium text-[#1B4332]">1:{log.ratio?.toString()}</p>
            </div>
          </div>
          
          {log.notes && (
            <div className="mt-4 mb-4">
              <p className="text-gray-700">{log.notes}</p>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Link
              href={`/logs/${log.id}`}
              className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
