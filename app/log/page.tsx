import { CoffeeLogForm } from '@/components/coffee/CoffeeLogForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Coffee Log | Coffee Log',
  description: 'Log your coffee brewing experience with detailed notes and ratings',
};

export default function LogPage() {
  return (
    <main className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-yellow-500 mb-8 text-center">
          Create Coffee Log
        </h1>
        <CoffeeLogForm />
      </div>
    </main>
  );
}
