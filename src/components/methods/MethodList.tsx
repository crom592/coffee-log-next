import { BrewMethod } from '@prisma/client';
import Link from 'next/link';

export default function MethodList({ methods }: { methods: BrewMethod[] }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {methods.map((method) => (
        <div
          key={method.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-4">{method.name}</h2>
          
          {method.description && (
            <div className="mb-4">
              <p className="text-gray-800">{method.description}</p>
            </div>
          )}
          
          <div className="space-y-3">
            {method.defaultDose && (
              <div>
                <p className="text-gray-600 text-sm">Default Dose</p>
                <p className="font-medium">{method.defaultDose.toString()}g</p>
              </div>
            )}
            {method.defaultRatio && (
              <div>
                <p className="text-gray-600 text-sm">Default Ratio</p>
                <p className="font-medium">1:{method.defaultRatio.toString()}</p>
              </div>
            )}
            {method.defaultTemp && (
              <div>
                <p className="text-gray-600 text-sm">Default Temperature</p>
                <p className="font-medium">{method.defaultTemp.toString()}°C</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Link
              href={`/methods/${method.id}`}
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
