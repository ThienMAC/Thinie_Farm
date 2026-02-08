import Image from 'next/image';
import Link from 'next/link';
import { FarmDiaryPost } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface DiaryCardProps {
  post: FarmDiaryPost;
}

export default function DiaryCard({ post }: DiaryCardProps) {
  // Generate unique gradient colors based on post slug
  const gradients = [
    'from-green-100 via-emerald-100 to-teal-100',
    'from-blue-100 via-cyan-100 to-sky-100',
    'from-purple-100 via-violet-100 to-indigo-100',
    'from-orange-100 via-amber-100 to-yellow-100',
    'from-pink-100 via-rose-100 to-red-100',
  ];
  
  const icons = ['🌱', '🌿', '🥬', '🥗', '🌾'];
  
  const index = post.slug.length % gradients.length;
  const gradient = gradients[index];
  const icon = icons[index];

  return (
    <Link href={`/farm-diary/${post.slug}`}>
      <div className="border border-green-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white group card-hover">
        <div className={`relative h-56 w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <div className="text-center z-10">
            <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
            <p className="text-sm text-gray-600 font-medium px-4">
              {post.title.split('-')[1]?.trim() || 'Nhật ký trồng rau'}
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <span className="text-green-600">📅</span>
              {format(new Date(post.date), 'dd/MM/yyyy', { locale: vi })}
            </span>
            {post.daysToHarvest > 0 && (
              <span className="flex items-center gap-1">
                <span className="text-amber-600">⏱️</span>
                {post.daysToHarvest} ngày
              </span>
            )}
          </div>
          
          <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          
          {post.survivalRate > 0 && (
            <div className="flex items-center gap-2 pt-3 border-t border-green-50">
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
                ✓ Tỷ lệ sống: {post.survivalRate}%
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
