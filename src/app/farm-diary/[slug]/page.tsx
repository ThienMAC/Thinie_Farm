import { getFarmDiaryPost, getFarmDiaryPostSlugs } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const slugs = await getFarmDiaryPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function FarmDiaryPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getFarmDiaryPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      {/* Hero Section with gradient */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 border-b border-green-100">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Back button */}
          <Link 
            href="/farm-diary"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 font-medium group transition-all"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Quay lại nhật ký
          </Link>

          {/* Header */}
          <header>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta info with icons */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm">
                <span className="text-green-600">📅</span>
                <span className="text-sm font-medium text-gray-700">
                  {format(new Date(post.date), 'dd/MM/yyyy', { locale: vi })}
                </span>
              </div>
              
              {post.daysToHarvest > 0 && (
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200 shadow-sm">
                  <span className="text-amber-600">⏱️</span>
                  <span className="text-sm font-medium text-gray-700">
                    {post.daysToHarvest} ngày
                  </span>
                </div>
              )}
              
              {post.survivalRate > 0 && (
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm font-medium text-gray-700">
                    Tỷ lệ sống: {post.survivalRate}%
                  </span>
                </div>
              )}
            </div>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl py-12">
        {/* Key info - Enhanced design */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="text-4xl bg-white p-3 rounded-xl shadow-sm">🌱</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Cách gieo hạt</h3>
                <p className="text-gray-700 leading-relaxed">{post.howToPlant}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="text-4xl bg-white p-3 rounded-xl shadow-sm">💧</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Cách tưới nước</h3>
                <p className="text-gray-700 leading-relaxed">{post.howToWater}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Images Gallery - Enhanced */}
        {post.images && post.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">📸 Hình ảnh quá trình</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {post.images.map((image, index) => {
                const gradients = [
                  'from-green-100 to-emerald-200',
                  'from-blue-100 to-cyan-200',
                  'from-purple-100 to-violet-200',
                ];
                return (
                  <div key={index} className="group">
                    <div className={`relative h-64 bg-gradient-to-br ${gradients[index % 3]} rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all cursor-pointer`}>
                      <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <span className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                          {['🌱', '🌿', '🥬'][index % 3]}
                        </span>
                        <p className="text-sm font-medium text-gray-700">
                          {index === 0 && 'Ngày đầu tiên'}
                          {index === 1 && 'Đang phát triển'}
                          {index === 2 && 'Thu hoạch'}
                          {index > 2 && `Ảnh ${index + 1}`}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Ảnh sẽ được cập nhật</p>
                      </div>
                      {/* Decorative corner */}
                      <div className="absolute top-3 right-3 w-12 h-12 bg-white/40 rounded-full blur-xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content - Beautiful typography */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <div className="prose prose-lg prose-green max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8 prose-h2:border-b prose-h2:border-green-100 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:my-6 prose-li:my-2
              prose-a:text-green-600 prose-a:no-underline hover:prose-a:text-green-700
              prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-table:border prose-table:border-gray-200
              prose-th:bg-green-50 prose-th:p-3 prose-th:border prose-th:border-gray-200
              prose-td:p-3 prose-td:border prose-td:border-gray-200
            ">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </div>

        {/* Lessons learned - Enhanced design */}
        {post.lessons && post.lessons.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl bg-white p-3 rounded-xl shadow-sm">💡</div>
                <h3 className="font-bold text-2xl text-gray-900">Bài học rút ra</h3>
              </div>
              <ul className="space-y-4">
                {post.lessons.map((lesson, index) => (
                  <li key={index} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-amber-200">
                    <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 leading-relaxed flex-1">{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Navigation - Enhanced */}
        <div className="border-t-2 border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Link 
              href="/farm-diary"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all hover:shadow-lg font-semibold group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Xem thêm nhật ký khác
            </Link>
            
            <div className="flex gap-3">
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors" title="Chia sẻ">
                📤
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors" title="Lưu">
                ❤️
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

