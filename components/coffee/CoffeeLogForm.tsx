'use client';

import { useMachine } from '@xstate/react';
import { coffeeLogMachine, CoffeeLogContext } from '@/machines/coffeeLogMachine';
import { useState } from 'react';

const roastLevels = ['Light', 'Medium-Light', 'Medium', 'Medium-Dark', 'Dark'];
const brewingMethods = ['Pour Over', 'French Press', 'Espresso', 'AeroPress', 'Cold Brew'];
const grindSizes = ['Extra Fine', 'Fine', 'Medium-Fine', 'Medium', 'Medium-Coarse', 'Coarse'];
const tastingNoteCategories = {
  'Fruity': ['Berry', 'Citrus', 'Stone Fruit', 'Tropical'],
  'Sweet': ['Caramel', 'Chocolate', 'Honey', 'Vanilla'],
  'Floral': ['Jasmine', 'Rose', 'Lavender'],
  'Spicy': ['Cinnamon', 'Nutmeg', 'Black Pepper'],
  'Nutty': ['Almond', 'Hazelnut', 'Peanut'],
  'Other': ['Earthy', 'Smoky', 'Woody', 'Herbal'],
};

export const CoffeeLogForm = () => {
  const [state, send] = useMachine(coffeeLogMachine, {
    config: {
      actions: {
        updateContext: (context, event) => ({
          ...context,
          ...event.data,
        }),
      },
    },
    services: {
      submitLog: async (context) => {
        // API call would go here
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted:', context);
      },
    },
  });

  const [formData, setFormData] = useState<CoffeeLogContext>({});

  const handleUpdate = (data: Partial<CoffeeLogContext>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    send({ type: 'UPDATE', data });
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-500">
            {state.matches('beanInfo') && 'Bean Information'}
            {state.matches('brewingInfo') && 'Brewing Details'}
            {state.matches('tastingInfo') && 'Tasting Notes'}
            {state.matches('review') && 'Review'}
          </h2>
          <div className="text-sm text-gray-400">
            Step {state.matches('beanInfo') ? '1' : state.matches('brewingInfo') ? '2' : state.matches('tastingInfo') ? '3' : '4'} of 4
          </div>
        </div>

        {state.matches('beanInfo') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Origin
              </label>
              <input
                type="text"
                value={formData.beanOrigin || ''}
                onChange={(e) => handleUpdate({ beanOrigin: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Ethiopia Yirgacheffe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Roast Level
              </label>
              <select
                value={formData.roastLevel || ''}
                onChange={(e) => handleUpdate({ roastLevel: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select roast level</option>
                {roastLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {state.matches('brewingInfo') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Brewing Method
              </label>
              <select
                value={formData.brewingMethod || ''}
                onChange={(e) => handleUpdate({ brewingMethod: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select method</option>
                {brewingMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Grind Size
              </label>
              <select
                value={formData.grindSize || ''}
                onChange={(e) => handleUpdate({ grindSize: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select grind size</option>
                {grindSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Water Temperature (°C)
              </label>
              <input
                type="number"
                value={formData.waterTemperature || ''}
                onChange={(e) => handleUpdate({ waterTemperature: Number(e.target.value) })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., 93"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Coffee to Water Ratio
              </label>
              <input
                type="text"
                value={formData.ratio || ''}
                onChange={(e) => handleUpdate({ ratio: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., 1:16"
              />
            </div>
          </div>
        )}

        {state.matches('tastingInfo') && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Tasting Notes
              </label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(tastingNoteCategories).map(([category, notes]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-sm font-medium text-yellow-500">{category}</h3>
                    {notes.map((note) => (
                      <label key={note} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.tastingNotes?.includes(note) || false}
                          onChange={(e) => {
                            const currentNotes = formData.tastingNotes || [];
                            const newNotes = e.target.checked
                              ? [...currentNotes, note]
                              : currentNotes.filter((n) => n !== note);
                            handleUpdate({ tastingNotes: newNotes });
                          }}
                          className="text-yellow-500 focus:ring-yellow-500 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="text-sm text-gray-300">{note}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleUpdate({ rating })}
                    className={`p-2 rounded-full ${
                      formData.rating >= rating
                        ? 'text-yellow-500'
                        : 'text-gray-500'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {state.matches('review') && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-yellow-500">Review your entry</h3>
            <div className="bg-gray-700 rounded-lg p-4 space-y-3">
              <div>
                <span className="text-gray-400">Origin:</span>{' '}
                <span className="text-white">{formData.beanOrigin}</span>
              </div>
              <div>
                <span className="text-gray-400">Roast Level:</span>{' '}
                <span className="text-white">{formData.roastLevel}</span>
              </div>
              <div>
                <span className="text-gray-400">Brewing Method:</span>{' '}
                <span className="text-white">{formData.brewingMethod}</span>
              </div>
              <div>
                <span className="text-gray-400">Grind Size:</span>{' '}
                <span className="text-white">{formData.grindSize}</span>
              </div>
              <div>
                <span className="text-gray-400">Water Temperature:</span>{' '}
                <span className="text-white">{formData.waterTemperature}°C</span>
              </div>
              <div>
                <span className="text-gray-400">Ratio:</span>{' '}
                <span className="text-white">{formData.ratio}</span>
              </div>
              <div>
                <span className="text-gray-400">Tasting Notes:</span>{' '}
                <span className="text-white">
                  {formData.tastingNotes?.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Rating:</span>{' '}
                <span className="text-yellow-500">
                  {'★'.repeat(formData.rating || 0)}
                </span>
                <span className="text-gray-500">
                  {'★'.repeat(5 - (formData.rating || 0))}
                </span>
              </div>
            </div>
          </div>
        )}

        {state.matches('error') && (
          <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-4">
            An error occurred while saving your coffee log. Please try again.
          </div>
        )}

        {state.matches('success') && (
          <div className="bg-green-900 text-green-100 p-4 rounded-lg mb-4">
            Your coffee log has been saved successfully!
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => send('BACK')}
          disabled={state.matches('idle') || state.matches('submitting')}
          className="px-4 py-2 text-gray-300 hover:text-white disabled:opacity-50"
        >
          Back
        </button>
        <div className="space-x-4">
          {state.matches('success') ? (
            <button
              onClick={() => send('NEW')}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400"
            >
              Create New Log
            </button>
          ) : (
            <button
              onClick={() =>
                send(
                  state.matches('review')
                    ? 'SUBMIT'
                    : state.matches('error')
                    ? 'RETRY'
                    : 'NEXT'
                )
              }
              disabled={state.matches('submitting')}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 disabled:opacity-50"
            >
              {state.matches('submitting') && (
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
              )}
              {state.matches('review')
                ? 'Submit'
                : state.matches('error')
                ? 'Retry'
                : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
