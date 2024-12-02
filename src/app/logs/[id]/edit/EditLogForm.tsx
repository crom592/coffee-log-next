'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bean, BrewMethod, Log } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const editLogSchema = z.object({
  temperature: z.number().nullable(),
  doseIn: z.number().nullable(),
  doseOut: z.number().nullable(),
  ratio: z.number().nullable(),
  timeSeconds: z.number().nullable(),
  tds: z.number().nullable(),
  extractionYield: z.number().nullable(),
  notes: z.string().nullable(),
  improvements: z.string().nullable(),
  rating: z.number().min(1).max(5).nullable(),
});

type EditLogFormValues = z.infer<typeof editLogSchema>;

type LogWithDetails = Log & {
  bean: Bean;
  method: BrewMethod;
};

interface EditLogFormProps {
  log: LogWithDetails;
}

export function EditLogForm({ log }: EditLogFormProps) {
  const router = useRouter();

  const form = useForm<EditLogFormValues>({
    resolver: zodResolver(editLogSchema),
    defaultValues: {
      temperature: log.temperature,
      doseIn: log.doseIn,
      doseOut: log.doseOut,
      ratio: log.ratio,
      timeSeconds: log.timeSeconds,
      tds: log.tds,
      extractionYield: log.extractionYield,
      notes: log.notes,
      improvements: log.improvements,
      rating: log.rating,
    },
  });

  const onSubmit = async (data: EditLogFormValues) => {
    try {
      const response = await fetch(`/api/logs/${log.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update log');
      }

      toast.success('Log updated successfully');
      router.push(`/logs/${log.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating log:', error);
      toast.error('Failed to update log');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (°C)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="93.5"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeSeconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time (seconds)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="180"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doseIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dose (g)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="18"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doseOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yield (g)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="36"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ratio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ratio (1:n)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="2"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TDS (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="8.5"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="extractionYield"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extraction Yield (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="20"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add your tasting notes or brewing observations..."
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="improvements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Improvements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add your improvements for the next brew..."
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="submit"
            variant="default"
            className="bg-[#1B4332] hover:bg-[#143728] text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
