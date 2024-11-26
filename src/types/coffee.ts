export interface CoffeeOrigin {
  country: string;
  region: string;
  farm: string;
  altitude: string;
}

export interface BrewingSettings {
  waterTemp: number;
  ratio: string;
  grindSize: string;
  brewTime: string;
}

export interface CoffeePreset {
  id: string;
  name: string;
  origin: CoffeeOrigin;
  processing: string;
  roastPoint: string;
  beanNotes: string;
  defaultBrewingSettings: BrewingSettings;
}

export interface CoffeeLog {
  id: string;
  userId: string;
  originCountry: string;
  originRegion: string;
  originFarm: string;
  originAltitude: string;
  processing: string;
  roastPoint: string;
  beanNotes: string;
  waterType: string;
  dose: string;
  waterAmount: string;
  ratio: string;
  grinder: string;
  grindSize: string;
  waterTemp: string;
  dripper: string;
  filter: string;
  recipe: string;
  brewTime: string;
  tds: string;
  extraction: string;
  cupNotes: string;
  improvements: string;
  isPublic: boolean;
  allowCollaboration: boolean;
  createdAt: Date;
  updatedAt: Date;
}
