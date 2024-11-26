export interface CoffeePreset {
  id: string;
  name: string;
  origin: {
    country: string;
    region: string;
    farm: string;
    altitude: string;
  };
  processing: string;
  roastPoint: string;
  beanNotes: string;
  defaultBrewingSettings: {
    waterTemp: number;
    ratio: string;
    grindSize: string;
    brewTime: string;
  };
}

export const coffeePresets: CoffeePreset[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: '에티오피아 예가체프',
    origin: {
      country: '에티오피아',
      region: '예가체프',
      farm: 'YCFCU (예가체프 커피 농가 조합)',
      altitude: '1,750-2,200m',
    },
    processing: '워시드',
    roastPoint: '라이트-미디엄',
    beanNotes: '자스민, 베르가못, 레몬, 얼그레이',
    defaultBrewingSettings: {
      waterTemp: 92,
      ratio: '1:16',
      grindSize: '중간-고운',
      brewTime: '2:30',
    },
  },
  {
    id: 'guatemala-antigua',
    name: '과테말라 안티구아',
    origin: {
      country: '과테말라',
      region: '안티구아',
      farm: '라 폴리 에스테이트',
      altitude: '1,500-1,700m',
    },
    processing: '워시드',
    roastPoint: '미디엄',
    beanNotes: '초콜릿, 견과류, 오렌지, 캐러멜',
    defaultBrewingSettings: {
      waterTemp: 93,
      ratio: '1:15',
      grindSize: '중간',
      brewTime: '2:45',
    },
  },
  {
    id: 'colombia-huila',
    name: '콜롬비아 우일라',
    origin: {
      country: '콜롬비아',
      region: '우일라',
      farm: '부에나비스타',
      altitude: '1,600-1,900m',
    },
    processing: '워시드',
    roastPoint: '미디엄',
    beanNotes: '카라멜, 사과, 꿀, 견과류',
    defaultBrewingSettings: {
      waterTemp: 93,
      ratio: '1:15.5',
      grindSize: '중간',
      brewTime: '2:40',
    },
  },
  {
    id: 'kenya-aa',
    name: '케냐 AA',
    origin: {
      country: '케냐',
      region: '니에리',
      farm: '가투야이니 워시드 스테이션',
      altitude: '1,700-1,900m',
    },
    processing: '워시드',
    roastPoint: '미디엄-라이트',
    beanNotes: '블랙베리, 자몽, 와인, 흑설탕',
    defaultBrewingSettings: {
      waterTemp: 94,
      ratio: '1:16',
      grindSize: '중간-고운',
      brewTime: '2:30',
    },
  },
];
