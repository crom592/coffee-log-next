'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface FormData {
  bean: string;
  country: string;
  region: string;
  farm: string;
  altitude: string;
  processing: string;
  cupNotesBean: string;
  roastPoint: string;
  waterType: string;
  dose: string;
  waterAmount: string;
  brewRatio: string;
  grinderType: string;
  grindSize: string;
  waterTemp: string;
  dripper: string;
  filter: string;
  recipe: string;
  brewTime: string;
  tds: string;
  yield: string;
  cupNotes: string;
  improvements: string;
}

interface InputField {
  label: string;
  name: keyof FormData;
  placeholder: string;
}

export default function NewLogPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    bean: '',
    country: '',
    region: '',
    farm: '',
    altitude: '',
    processing: '',
    cupNotesBean: '',
    roastPoint: '',
    waterType: '',
    dose: '',
    waterAmount: '',
    brewRatio: '',
    grinderType: '',
    grindSize: '',
    waterTemp: '',
    dripper: '',
    filter: '',
    recipe: '',
    brewTime: '',
    tds: '',
    yield: '',
    cupNotes: '',
    improvements: ''
  })

  const samples: { label: string; data: FormData }[] = [
    {
      label: 'Ethiopia Yirgacheffe',
      data: {
        bean: 'Ethiopia Yirgacheffe',
        country: 'Ethiopia',
        region: 'Yirgacheffe',
        farm: 'Adado Cooperative',
        altitude: '2000m',
        processing: 'Washed',
        cupNotesBean: 'Floral, Jasmine, Bergamot',
        roastPoint: 'Medium Light',
        waterType: 'Filtered Water',
        dose: '15g',
        waterAmount: '250ml',
        brewRatio: '1:16',
        grinderType: 'Comandante C40',
        grindSize: 'Medium Fine',
        waterTemp: '92°C',
        dripper: 'V60',
        filter: 'Hario Paper Filter',
        recipe: 'Pour over in circles, bloom for 30s, total pour in 2:30',
        brewTime: '2:30',
        tds: '1.35%',
        yield: '250ml',
        cupNotes: 'Bright, Floral, Clean Finish',
        improvements: 'Increase brew ratio for better balance'
      }
    },
    {
      label: 'Kenya AA',
      data: {
        bean: 'Kenya AA',
        country: 'Kenya',
        region: 'Nyeri',
        farm: 'Kiandu Estate',
        altitude: '1800m',
        processing: 'Washed',
        cupNotesBean: 'Blackberry, Dark Chocolate, Wine-like',
        roastPoint: 'Medium',
        waterType: 'Third Wave Water',
        dose: '20g',
        waterAmount: '300ml',
        brewRatio: '1:15',
        grinderType: 'Fellow Ode',
        grindSize: 'Medium',
        waterTemp: '94°C',
        dripper: 'Origami Dripper',
        filter: 'Origami Filter',
        recipe: 'Center pour, 45s bloom, 3 pours of 100ml each',
        brewTime: '3:00',
        tds: '1.42%',
        yield: '280ml',
        cupNotes: 'Bright acidity, Full body, Wine-like finish',
        improvements: 'Try finer grind for more sweetness'
      }
    },
    {
      label: 'Guatemala Antigua',
      data: {
        bean: 'Guatemala Antigua',
        country: 'Guatemala',
        region: 'Antigua Valley',
        farm: 'La Folie Estate',
        altitude: '1600m',
        processing: 'Honey',
        cupNotesBean: 'Chocolate, Orange, Caramel',
        roastPoint: 'Medium Dark',
        waterType: 'Spring Water',
        dose: '18g',
        waterAmount: '270ml',
        brewRatio: '1:15',
        grinderType: 'Baratza Virtuoso+',
        grindSize: 'Medium Coarse',
        waterTemp: '90°C',
        dripper: 'Kalita Wave 185',
        filter: 'Kalita Wave Filter',
        recipe: 'Flat bed pour, 40s bloom, pulse pours',
        brewTime: '3:15',
        tds: '1.38%',
        yield: '260ml',
        cupNotes: 'Sweet, balanced, chocolate finish',
        improvements: 'Experiment with higher temperature'
      }
    },
    {
      label: 'Panama Geisha',
      data: {
        bean: 'Panama Geisha',
        country: 'Panama',
        region: 'Boquete',
        farm: 'Hacienda La Esmeralda',
        altitude: '1700m',
        processing: 'Natural',
        cupNotesBean: 'Jasmine, Peach, Bergamot',
        roastPoint: 'Light',
        waterType: 'Reverse Osmosis + Minerals',
        dose: '15g',
        waterAmount: '250ml',
        brewRatio: '1:16.7',
        grinderType: 'Weber EG-1',
        grindSize: 'Medium Fine',
        waterTemp: '96°C',
        dripper: 'December Dripper',
        filter: 'Cafec Abaca Filter',
        recipe: 'Slow center pour, long bloom, gentle pours',
        brewTime: '2:45',
        tds: '1.32%',
        yield: '240ml',
        cupNotes: 'Delicate, tea-like, floral sweetness',
        improvements: 'Try lower temperature for more florals'
      }
    },
    {
      label: 'Brazil Yellow Bourbon',
      data: {
        bean: 'Brazil Yellow Bourbon',
        country: 'Brazil',
        region: 'Minas Gerais',
        farm: 'Fazenda Santa Ines',
        altitude: '1200m',
        processing: 'Pulped Natural',
        cupNotesBean: 'Nuts, Chocolate, Brown Sugar',
        roastPoint: 'Medium Dark',
        waterType: 'Filtered Tap Water',
        dose: '19g',
        waterAmount: '285ml',
        brewRatio: '1:15',
        grinderType: 'Mahlkönig X54',
        grindSize: 'Medium',
        waterTemp: '88°C',
        dripper: 'Blue Bottle Dripper',
        filter: 'Mellita Filter',
        recipe: 'Single continuous pour, 30s bloom',
        brewTime: '2:50',
        tds: '1.45%',
        yield: '275ml',
        cupNotes: 'Rich, nutty, clean sweetness',
        improvements: 'Try shorter brew time for more clarity'
      }
    }
  ]

  const handleSampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSample = samples.find(sample => sample.label === e.target.value)
    if (selectedSample) {
      setFormData(selectedSample.data)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name as keyof FormData]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/logs')
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex items-center mb-8">
          <Link href="/logs">
            <button className="mr-4 p-2 hover:bg-[#E9E5E0] rounded-lg transition-colors">
              <ChevronLeft className="h-6 w-6 text-[#1B4332]" />
            </button>
          </Link>
          <h1 className="text-[#1B4332] text-2xl font-serif">New Coffee Log</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#E9E5E0] p-6 rounded-2xl space-y-6 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-xl font-serif text-[#1B4332] mb-2">Choose an Option</h2>
              <p className="text-[#1B4332]/80 text-sm">Select a sample or input your own values</p>
            </div>
            <div>
              <select
                onChange={handleSampleSelect}
                className="w-full p-3 rounded-lg border-2 border-[#1B4332]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332] text-[#1B4332] font-medium"
              >
                <option value="">Start from scratch or select a sample coffee</option>
                {samples.map((sample, index) => (
                  <option key={index} value={sample.label}>
                    {sample.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-[#E9E5E0] p-6 rounded-2xl space-y-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-serif text-[#1B4332] mb-4 border-b border-[#1B4332]/20 pb-2">Bean Information</h3>
                <div className="space-y-4">
                  {([
                    { label: 'Bean Name', name: 'bean' as keyof FormData, placeholder: 'e.g. Ethiopia Yirgacheffe' },
                    { label: 'Country', name: 'country' as keyof FormData, placeholder: 'e.g. Ethiopia' },
                    { label: 'Region', name: 'region' as keyof FormData, placeholder: 'e.g. Yirgacheffe' },
                    { label: 'Farm', name: 'farm' as keyof FormData, placeholder: 'e.g. Adado Cooperative' },
                    { label: 'Altitude', name: 'altitude' as keyof FormData, placeholder: 'e.g. 2000m' },
                    { label: 'Processing', name: 'processing' as keyof FormData, placeholder: 'e.g. Washed' },
                    { label: 'Cup Notes (Bean)', name: 'cupNotesBean' as keyof FormData, placeholder: 'e.g. Floral, Jasmine, Bergamot' },
                    { label: 'Roast Point', name: 'roastPoint' as keyof FormData, placeholder: 'e.g. Medium Light' }
                  ] as InputField[]).map(({ label, name, placeholder }) => (
                    <div key={name}>
                      <label className="block text-[#1B4332] font-serif mb-2">{label}</label>
                      <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg border border-[#1B4332]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif text-[#1B4332] mb-4 border-b border-[#1B4332]/20 pb-2">Brewing Parameters</h3>
                <div className="space-y-4">
                  {([
                    { label: 'Water Type', name: 'waterType' as keyof FormData, placeholder: 'e.g. Filtered Water' },
                    { label: 'Dose', name: 'dose' as keyof FormData, placeholder: 'e.g. 15g' },
                    { label: 'Water Amount', name: 'waterAmount' as keyof FormData, placeholder: 'e.g. 250ml' },
                    { label: 'Brew Ratio', name: 'brewRatio' as keyof FormData, placeholder: 'e.g. 1:16' },
                    { label: 'Grinder Type', name: 'grinderType' as keyof FormData, placeholder: 'e.g. Comandante C40' },
                    { label: 'Grind Size', name: 'grindSize' as keyof FormData, placeholder: 'e.g. Medium Fine' },
                    { label: 'Water Temperature', name: 'waterTemp' as keyof FormData, placeholder: 'e.g. 92°C' },
                    { label: 'Dripper', name: 'dripper' as keyof FormData, placeholder: 'e.g. V60' },
                    { label: 'Filter', name: 'filter' as keyof FormData, placeholder: 'e.g. Hario Paper Filter' },
                    { label: 'Recipe', name: 'recipe' as keyof FormData, placeholder: 'e.g. Pour over in circles, bloom for 30s' },
                    { label: 'Brew Time', name: 'brewTime' as keyof FormData, placeholder: 'e.g. 2:30' },
                    { label: 'TDS', name: 'tds' as keyof FormData, placeholder: 'e.g. 1.35%' },
                    { label: 'Yield', name: 'yield' as keyof FormData, placeholder: 'e.g. 250ml' }
                  ] as InputField[]).map(({ label, name, placeholder }) => (
                    <div key={name}>
                      <label className="block text-[#1B4332] font-serif mb-2">{label}</label>
                      <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg border border-[#1B4332]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif text-[#1B4332] mb-4 border-b border-[#1B4332]/20 pb-2">Results & Notes</h3>
                <div className="space-y-4">
                  {([
                    { label: 'Cup Notes', name: 'cupNotes' as keyof FormData, placeholder: 'e.g. Bright, Floral, Clean Finish' },
                    { label: 'Improvements', name: 'improvements' as keyof FormData, placeholder: 'e.g. Increase brew ratio for better balance' }
                  ] as InputField[]).map(({ label, name, placeholder }) => (
                    <div key={name}>
                      <label className="block text-[#1B4332] font-serif mb-2">{label}</label>
                      <textarea
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg border border-[#1B4332]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332] min-h-[80px]"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 rounded-lg bg-[#1B4332] text-white font-serif hover:bg-[#143728] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}