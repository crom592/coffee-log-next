'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useSession, getSession } from 'next-auth/react';
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';
import { fetchBeans, fetchMethods, createBean, createMethod } from '@/services/coffeeService';
import axios from 'axios';

interface BeanData {
  name: string;
  origin: string;
  region: string;
  farm: string;
  altitude: string;
  process: string;
  variety: string;
  roastLevel: string;
  roastDate: string;
  description: string;
}

interface BrewingData {
  grinderType: string;
  grindSize: number;
  temperature: number;
  doseIn: number;
  doseOut: number;
  ratio: number;
  timeSeconds: number;
  tds?: number;
  extractionYield?: number;
  waterType?: string;
  filterType?: string;
  notes?: string;
  improvements?: string;
  rating: number;
}

const defaultBeans = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    description: 'Bright and floral with citrus notes',
    roastLevel: 'Light'
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    origin: 'Colombia',
    description: 'Sweet caramel with balanced acidity',
    roastLevel: 'Medium'
  },
  {
    id: '3',
    name: 'Kenya AA',
    origin: 'Kenya',
    description: 'Bright, wine-like acidity with berry notes',
    roastLevel: 'Light-Medium'
  },
  {
    id: '4',
    name: 'Guatemala Antigua',
    origin: 'Guatemala',
    description: 'Complex with chocolate and spice notes',
    roastLevel: 'Medium'
  },
  {
    id: '5',
    name: 'Brazil Santos',
    origin: 'Brazil',
    description: 'Nutty and sweet with low acidity',
    roastLevel: 'Medium-Dark'
  }
];

const defaultMethods = [
  {
    id: '1',
    name: 'V60',
    description: 'Hario V60 pour-over method'
  },
  {
    id: '2',
    name: 'Espresso',
    description: 'Traditional espresso extraction'
  },
  {
    id: '3',
    name: 'Aeropress',
    description: 'Aeropress immersion/pressure method'
  },
  {
    id: '4',
    name: 'French Press',
    description: 'Full immersion brewing method'
  },
  {
    id: '5',
    name: 'Chemex',
    description: 'Chemex pour-over method'
  }
];

// Professional grinder presets with detailed specifications
const GRINDER_PRESETS = {
  'EK43': { 
    min: 1, 
    max: 11, 
    default: 6,
    description: 'Mahlkönig EK43 - Commercial flat burr grinder'
  },
  'Comandante': { 
    min: 1, 
    max: 40, 
    default: 20,
    description: 'Comandante C40 - Premium hand grinder'
  },
  'Kinu M47': { 
    min: 0, 
    max: 50, 
    default: 25,
    description: 'Kinu M47 - High-end hand grinder'
  },
  'Fellow Ode': { 
    min: 1, 
    max: 11, 
    default: 6,
    description: 'Fellow Ode Gen 2 - Modern flat burr grinder'
  }
} as const;

// Professional brewing method defaults with detailed parameters
const METHOD_DEFAULTS = {
  'V60': {
    temperature: 92.5,
    ratio: 16.67, // 1:16.67
    doseIn: 15,
    timeSeconds: 150, // 2:30
    grindSize: GRINDER_PRESETS['Comandante'].default,
    recipe: 'Bloom 45s, spiral pour, draw down',
    waterType: 'Filtered',
    filterType: 'Hario V60 02 Paper Filter'
  },
  'Espresso': {
    temperature: 93.0,
    ratio: 2.0, // 1:2
    doseIn: 18,
    timeSeconds: 28,
    grindSize: GRINDER_PRESETS['EK43'].default - 2,
    recipe: 'Pre-infusion 3s, steady pressure',
    waterType: 'Filtered',
    filterType: 'Portafilter Basket'
  },
  'Aeropress': {
    temperature: 85.0,
    ratio: 13.33, // 1:13.33
    doseIn: 15,
    timeSeconds: 90,
    grindSize: GRINDER_PRESETS['Comandante'].default + 2,
    recipe: 'Inverted method, bloom 30s',
    waterType: 'Filtered',
    filterType: 'Aeropress Paper Filter'
  },
  'French Press': {
    temperature: 95.0,
    ratio: 15.0, // 1:15
    doseIn: 30,
    timeSeconds: 240, // 4:00
    grindSize: GRINDER_PRESETS['Comandante'].default + 10,
    recipe: 'Break crust at 4:00, plunge slowly',
    waterType: 'Filtered',
    filterType: 'Metal Mesh'
  },
  'Chemex': {
    temperature: 94.0,
    ratio: 16.67, // 1:16.67
    doseIn: 30,
    timeSeconds: 240, // 4:00
    grindSize: GRINDER_PRESETS['EK43'].default + 1,
    recipe: 'Bloom 45s, continuous center pour',
    waterType: 'Filtered',
    filterType: 'Chemex Filter'
  }
} as const;

export default function NewLogForm() {
  const router = useRouter()
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false)
  const [beans, setBeans] = useState(defaultBeans);
  const [methods, setMethods] = useState(defaultMethods);
  const [selectedBeanId, setSelectedBeanId] = useState(null);
  const [selectedMethodId, setSelectedMethodId] = useState(null);

  const [beanData, setBeanData] = useState<BeanData>({
    name: '',
    origin: '',
    region: '',
    farm: '',
    altitude: '',
    process: '',
    variety: '',
    roastLevel: '',
    roastDate: '',
    description: ''
  });

  const [brewingData, setBrewingData] = useState<BrewingData>({
    grinderType: 'EK43',
    grindSize: GRINDER_PRESETS['EK43'].default,
    temperature: 92.5,
    doseIn: 15,
    doseOut: 250,
    ratio: 16.67,
    timeSeconds: 150,
    tds: undefined,
    extractionYield: undefined,
    waterType: 'Filtered',
    filterType: 'Hario V60 02',
    notes: '',
    improvements: '',
    rating: 0
  });

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const parseTime = (timeStr: string): number => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return (minutes * 60) + seconds;
  };

  useEffect(() => {
    const newDoseOut = brewingData.doseIn * brewingData.ratio;
    setBrewingData(prev => ({
      ...prev,
      doseOut: Number(newDoseOut.toFixed(1))
    }));
  }, [brewingData.doseIn, brewingData.ratio]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [beansData, methodsData] = await Promise.all([
          fetchBeans(),
          fetchMethods()
        ]);
        
        if (beansData.length === 0) {
          // If no beans in database, use default beans
          setBeans(defaultBeans);
        } else {
          setBeans(beansData);
        }
        
        if (methodsData.length === 0) {
          // If no methods in database, use default methods
          setMethods(defaultMethods);
        } else {
          setMethods(methodsData);
        }
      } catch (error) {
        console.error('Error loading options:', error);
        // Fallback to default values if API fails
        setBeans(defaultBeans);
        setMethods(defaultMethods);
      }
    };

    loadOptions();
  }, []);

  const handleMethodChange = (methodId: string) => {
    setSelectedMethodId(methodId);
    
    // If method is selected, apply default values
    if (methodId) {
      const selectedMethod = methods.find(m => m.id === methodId);
      if (selectedMethod) {
        const methodDefaults = METHOD_DEFAULTS[selectedMethod.name as keyof typeof METHOD_DEFAULTS];
        if (methodDefaults) {
          setBrewingData(prev => ({
            ...prev,
            ...methodDefaults,
            // Preserve current grinder settings if they exist
            grinderType: prev.grinderType,
            grindSize: prev.grindSize
          }));
        }
      }
    }
  };

  const handleGrinderChange = (grinderType: string) => {
    const preset = GRINDER_PRESETS[grinderType];
    setBrewingData(prev => ({
      ...prev,
      grinderType,
      grindSize: preset.default
    }));
  };

  const handleBeanChange = async (beanId: string) => {
    setSelectedBeanId(beanId);
    const selectedBean = beans.find(b => b.id === beanId);
    if (selectedBean) {
      setBeanData({
        name: selectedBean.name,
        origin: selectedBean.origin || '',
        region: '',
        farm: '',
        altitude: '',
        process: '',
        variety: '',
        roastLevel: selectedBean.roastLevel || '',
        roastDate: '',
        description: selectedBean.description || ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');

    // Debug current state
    console.log('Current State:', {
      selectedBeanId,
      selectedMethodId,
      beanData,
      brewingData,
      session
    });

    if (!selectedBeanId || !selectedMethodId) {
      const message = `Missing selections: ${!selectedBeanId ? 'Bean' : ''} ${!selectedMethodId ? 'Method' : ''}`.trim();
      console.error(message);
      toast.error(message);
      return;
    }

    if (!session?.user?.id) {
      console.error('No user session');
      toast.error('Please sign in to save logs');
      return;
    }

    try {
      setIsLoading(true);

      // Validate brewing data
      const requiredBrewingFields = {
        grindSize: brewingData.grindSize,
        temperature: brewingData.temperature,
        doseIn: brewingData.doseIn,
        ratio: brewingData.ratio,
      };

      const missingFields = Object.entries(requiredBrewingFields)
        .filter(([_, value]) => !value && value !== 0)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        const message = `Missing required brewing fields: ${missingFields.join(', ')}`;
        console.error(message);
        toast.error(message);
        return;
      }

      // Prepare the log data with all required fields
      const logData = {
        beanId: selectedBeanId,
        methodId: selectedMethodId,
        // Bean data
        beanOrigin: beanData.origin || null,
        beanRegion: beanData.region || null,
        beanFarm: beanData.farm || null,
        beanAltitude: beanData.altitude || null,
        beanProcess: beanData.process || null,
        beanVariety: beanData.variety || null,
        beanRoastLevel: beanData.roastLevel || null,
        beanRoastDate: beanData.roastDate || null,
        beanDescription: beanData.description || null,
        // Brewing data
        grinderType: brewingData.grinderType,
        grindSize: Number(brewingData.grindSize),
        temperature: Number(brewingData.temperature.toFixed(1)),
        doseIn: Number(brewingData.doseIn.toFixed(1)),
        doseOut: Number(brewingData.doseOut.toFixed(1)),
        ratio: Number(brewingData.ratio.toFixed(2)),
        timeSeconds: Number(brewingData.timeSeconds),
        tds: brewingData.tds ? Number(brewingData.tds.toFixed(2)) : null,
        extractionYield: brewingData.extractionYield ? Number(brewingData.extractionYield.toFixed(2)) : null,
        waterType: brewingData.waterType || null,
        filterType: brewingData.filterType || null,
        notes: brewingData.notes || '',
        improvements: brewingData.improvements || '',
        rating: Number(brewingData.rating)
      };

      console.log('Submitting log data:', logData);

      const response = await axios.post('/api/logs', logData);
      console.log('Response:', response.status, response.data);

      toast.success('Coffee log created successfully!');
      router.push('/logs');
    } catch (error) {
      console.error('Error creating log:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        console.error('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        toast.error(`Error: ${message}`);
      } else {
        console.error('Unknown error:', error);
        toast.error('Failed to create log');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrewingDataChange = (field: keyof BrewingData, value: any) => {
    setBrewingData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Bean Selection and Details */}
      <div className="space-y-4">
        <Label>Coffee Bean Selection</Label>
        <select
          value={selectedBeanId || ''}
          onChange={(e) => handleBeanChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Bean</option>
          {beans.map(bean => (
            <option key={bean.id} value={bean.id}>{bean.name}</option>
          ))}
        </select>

        {/* Bean Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Origin</Label>
            <Input
              value={beanData.origin}
              onChange={(e) => setBeanData(prev => ({ ...prev, origin: e.target.value }))}
              placeholder="Country of origin"
            />
          </div>
          <div>
            <Label>Region</Label>
            <Input
              value={beanData.region}
              onChange={(e) => setBeanData(prev => ({ ...prev, region: e.target.value }))}
              placeholder="Growing region"
            />
          </div>
          <div>
            <Label>Farm</Label>
            <Input
              value={beanData.farm}
              onChange={(e) => setBeanData(prev => ({ ...prev, farm: e.target.value }))}
              placeholder="Farm or cooperative"
            />
          </div>
          <div>
            <Label>Altitude</Label>
            <Input
              value={beanData.altitude}
              onChange={(e) => setBeanData(prev => ({ ...prev, altitude: e.target.value }))}
              placeholder="Growing altitude"
            />
          </div>
          <div>
            <Label>Processing Method</Label>
            <Input
              value={beanData.process}
              onChange={(e) => setBeanData(prev => ({ ...prev, process: e.target.value }))}
              placeholder="Washed, Natural, etc."
            />
          </div>
          <div>
            <Label>Variety</Label>
            <Input
              value={beanData.variety}
              onChange={(e) => setBeanData(prev => ({ ...prev, variety: e.target.value }))}
              placeholder="Bean variety"
            />
          </div>
          <div>
            <Label>Roast Level</Label>
            <Input
              value={beanData.roastLevel}
              onChange={(e) => setBeanData(prev => ({ ...prev, roastLevel: e.target.value }))}
              placeholder="Light, Medium, Dark"
            />
          </div>
          <div>
            <Label>Roast Date</Label>
            <Input
              type="date"
              value={beanData.roastDate}
              onChange={(e) => setBeanData(prev => ({ ...prev, roastDate: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={beanData.description}
            onChange={(e) => setBeanData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Tasting notes, aroma, etc."
            className="h-24"
          />
        </div>
      </div>

      {/* Method Selection */}
      <div className="space-y-4">
        <Label>Brewing Method</Label>
        <select
          value={selectedMethodId || ''}
          onChange={(e) => handleMethodChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Method</option>
          {methods.map(method => (
            <option key={method.id} value={method.id}>
              {method.name} - {method.description}
            </option>
          ))}
        </select>
      </div>

      {/* Brewing Parameters */}
      {selectedMethodId && (
        <div className="space-y-4">
          <Label>Grinder Settings</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Grinder Model</Label>
              <select
                value={brewingData.grinderType}
                onChange={(e) => handleGrinderChange(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {Object.keys(GRINDER_PRESETS).map(grinder => (
                  <option key={grinder} value={grinder}>
                    {grinder}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Grind Size</Label>
              <Input
                type="number"
                value={brewingData.grindSize}
                onChange={(e) => handleBrewingDataChange('grindSize', parseInt(e.target.value))}
                min={GRINDER_PRESETS[brewingData.grinderType].min}
                max={GRINDER_PRESETS[brewingData.grinderType].max}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Temperature (°C)</Label>
              <Input
                type="number"
                step="0.1"
                value={brewingData.temperature}
                onChange={(e) => handleBrewingDataChange('temperature', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <Label>Dose In (g)</Label>
              <Input
                type="number"
                step="0.1"
                value={brewingData.doseIn}
                onChange={(e) => handleBrewingDataChange('doseIn', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Dose Out (g)</Label>
              <Input
                type="number"
                step="0.1"
                value={brewingData.doseOut}
                onChange={(e) => handleBrewingDataChange('doseOut', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <Label>Ratio (1:{brewingData.ratio.toFixed(2)})</Label>
              <Input
                type="number"
                step="0.01"
                value={brewingData.ratio}
                onChange={(e) => handleBrewingDataChange('ratio', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Time (seconds)</Label>
              <Input
                type="number"
                value={brewingData.timeSeconds}
                onChange={(e) => handleBrewingDataChange('timeSeconds', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <Label>TDS (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={brewingData.tds || ''}
                onChange={(e) => handleBrewingDataChange('tds', e.target.value ? parseFloat(e.target.value) : null)}
                className="w-full"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Water Type</Label>
              <Input
                type="text"
                value={brewingData.waterType || ''}
                onChange={(e) => handleBrewingDataChange('waterType', e.target.value)}
                className="w-full"
                placeholder="e.g., Filtered, Spring, etc."
              />
            </div>
            <div>
              <Label>Filter Type</Label>
              <Input
                type="text"
                value={brewingData.filterType || ''}
                onChange={(e) => handleBrewingDataChange('filterType', e.target.value)}
                className="w-full"
                placeholder="e.g., V60 02, Chemex, etc."
              />
            </div>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={brewingData.notes || ''}
              onChange={(e) => handleBrewingDataChange('notes', e.target.value)}
              className="w-full h-24"
              placeholder="Tasting notes, observations..."
            />
          </div>

          <div>
            <Label>Improvements</Label>
            <Textarea
              value={brewingData.improvements || ''}
              onChange={(e) => handleBrewingDataChange('improvements', e.target.value)}
              className="w-full h-24"
              placeholder="What would you change next time?"
            />
          </div>

          <div>
            <Label>Rating (0-5)</Label>
            <Input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={brewingData.rating}
              onChange={(e) => handleBrewingDataChange('rating', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          {isLoading ? (
            <>
              <span className="mr-2">Saving...</span>
              <span className="animate-spin">⏳</span>
            </>
          ) : (
            'Save Coffee Log'
          )}
        </Button>
      </div>
    </form>
  );
}
