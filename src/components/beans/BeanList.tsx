import { Bean } from '@prisma/client';
import Link from 'next/link';

export default function BeanList({ beans }: { beans: Bean[] }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {beans.map((bean) => (
        <div
          key={bean.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">{bean.name}</h2>
          
          <div className="space-y-2 mb-4">
            <div>
              <p className="text-gray-600 text-sm">Origin</p>
              <p className="font-medium">{bean.origin}</p>
            </div>
            {bean.region && (
              <div>
                <p className="text-gray-600 text-sm">Region</p>
                <p className="font-medium">{bean.region}</p>
              </div>
            )}
            {bean.farm && (
              <div>
                <p className="text-gray-600 text-sm">Farm</p>
                <p className="font-medium">{bean.farm}</p>
              </div>
            )}
            {bean.altitude && (
              <div>
                <p className="text-gray-600 text-sm">Altitude</p>
                <p className="font-medium">{bean.altitude}m</p>
              </div>
            )}
            {bean.process && (
              <div>
                <p className="text-gray-600 text-sm">Process</p>
                <p className="font-medium">{bean.process}</p>
              </div>
            )}
          </div>
          
          {bean.notes && (
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Notes</p>
              <p className="text-gray-800">{bean.notes}</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <Link
              href={`/beans/${bean.id}`}
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
