import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FarmDiaryPost, Guide } from '@/types';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getFarmDiaryPosts(): FarmDiaryPost[] {
  const diaryDir = path.join(contentDirectory, 'farm-diary');
  
  if (!fs.existsSync(diaryDir)) {
    return [];
  }

  const files = fs.readdirSync(diaryDir);
  
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(diaryDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        startDate: data.startDate || '',
        howToPlant: data.howToPlant || '',
        howToWater: data.howToWater || '',
        survivalRate: data.survivalRate || 0,
        daysToHarvest: data.daysToHarvest || 0,
        lessons: data.lessons || [],
        images: data.images || [],
        excerpt: data.excerpt || '',
        content,
      } as FarmDiaryPost;
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function getFarmDiaryPost(slug: string): FarmDiaryPost | null {
  try {
    const fullPath = path.join(contentDirectory, 'farm-diary', `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      startDate: data.startDate || '',
      howToPlant: data.howToPlant || '',
      howToWater: data.howToWater || '',
      survivalRate: data.survivalRate || 0,
      daysToHarvest: data.daysToHarvest || 0,
      lessons: data.lessons || [],
      images: data.images || [],
      excerpt: data.excerpt || '',
      content,
    } as FarmDiaryPost;
  } catch {
    return null;
  }
}

export function getGuides(): Guide[] {
  const guidesDir = path.join(contentDirectory, 'guides');
  
  if (!fs.existsSync(guidesDir)) {
    return [];
  }

  const files = fs.readdirSync(guidesDir);
  
  const guides = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(guidesDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        category: data.category || 'Chung',
        content,
      } as Guide;
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return guides;
}

export function getGuide(slug: string): Guide | null {
  try {
    const fullPath = path.join(contentDirectory, 'guides', `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || 'Chung',
      content,
    } as Guide;
  } catch {
    return null;
  }
}
