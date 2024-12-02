import { Bean } from '@prisma/client';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function BeanList({ beans, onEdit, onDelete }: { beans: Bean[]; onEdit: (bean: Bean) => void; onDelete: (id: string) => void }) {
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
              <p className="font-medium">{bean.origin || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Roast Level</p>
              <p className="font-medium">{bean.roastLevel}</p>
            </div>
            {bean.description && (
              <div>
                <p className="text-gray-600 text-sm">Description</p>
                <p className="font-medium">{bean.description}</p>
              </div>
            )}
            <div>
              <p className="text-gray-600 text-sm">Added</p>
              <p className="font-medium">{new Date(bean.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(bean)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(bean.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
