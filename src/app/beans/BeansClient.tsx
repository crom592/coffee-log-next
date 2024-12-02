'use client';

import { Bean } from '@prisma/client';
import { useRouter } from 'next/navigation';
import BeanList from '@/components/beans/BeanList';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface BeansClientProps {
  initialBeans: Bean[];
}

export function BeansClient({ initialBeans }: BeansClientProps) {
  const router = useRouter();
  const [beans, setBeans] = useState(initialBeans);

  const handleEdit = (bean: Bean) => {
    router.push(`/beans/${bean.id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this bean?')) {
      try {
        const response = await fetch(`/api/beans/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete bean');
        }

        setBeans(beans.filter(bean => bean.id !== id));
        toast.success('Bean deleted successfully');
      } catch (error) {
        console.error('Error deleting bean:', error);
        toast.error('Failed to delete bean');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Coffee Beans</h1>
        <Link
          href="/beans/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add New Bean
        </Link>
      </div>
      <BeanList 
        beans={beans} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />
    </div>
  );
}
