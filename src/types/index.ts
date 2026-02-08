export interface FarmDiaryPost {
  slug: string;
  title: string;
  date: string;
  startDate: string;
  howToPlant: string;
  howToWater: string;
  survivalRate: number;
  daysToHarvest: number;
  lessons: string[];
  images: string[];
  excerpt: string;
  content: string;
}

export interface Guide {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  plantDate: string;
  harvestDate: string;
  quantity: number;
  status: 'thử nghiệm' | 'bán thử' | 'hết hàng';
  image: string;
  description: string;
  diaryLink?: string;
}
