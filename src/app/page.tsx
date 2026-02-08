import Link from 'next/link';
import { getFarmDiaryPosts } from '@/lib/api';
import DiaryCard from '@/components/DiaryCard';
import StatsSection from '@/components/StatsSection';
import ProcessSection from '@/components/ProcessSection';

export default async function Home() {
  const allPosts = await getFarmDiaryPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="text-7xl animate-bounce inline-block">🌱</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Tôi thử trồng rau sạch bằng<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              mô hình hiện đại – từ con số 0
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ghi lại quá trình học trồng, <span className="font-semibold text-green-700">kết quả thật</span>, không màu mè
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/farm-diary" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-semibold text-lg hover:scale-105">
              📖 Xem nhật ký trồng rau
            </Link>
            <Link href="/about" className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-full hover:bg-green-50 transition-all duration-300 font-semibold text-lg hover:scale-105">
              💚 Câu chuyện của tôi
            </Link>
          </div>
        </div>
      </section>

      {/* Vì sao làm dự án này */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Vì sao làm dự án này?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all duration-300 group">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🥬</div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Muốn có rau sạch</h3>
            <p className="text-gray-600 leading-relaxed">Tự trồng để biết nguồn gốc, an toàn cho gia đình</p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition-all duration-300 group">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔬</div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Muốn thử mô hình mới</h3>
            <p className="text-gray-600 leading-relaxed">Tìm hiểu canh tác hiện đại, tối ưu không gian</p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 hover:shadow-lg transition-all duration-300 group">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💡</div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Muốn xem có khả thi không</h3>
            <p className="text-gray-600 leading-relaxed">Thử nghiệm thực tế, ghi lại kết quả trung thực</p>
          </div>
        </div>
      </section>

      {/* Quy trình - với animated steps */}
      <ProcessSection />

      {/* Recent Diary Posts */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Nhật ký mới nhất</h2>
            <p className="text-gray-600 mt-2">Cập nhật hàng tuần từ vườn rau</p>
          </div>
          <Link href="/farm-diary" className="hidden md:flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold group">
            Xem tất cả 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <DiaryCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link href="/farm-diary" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold">
                Xem tất cả →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-200">
            <div className="text-7xl mb-6">🌱</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Hành trình sắp bắt đầu</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              Chưa có nhật ký nào. Nhật ký sẽ được cập nhật thường xuyên khi bắt đầu gieo trồng
            </p>
            <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
              <p className="text-sm text-green-700 font-medium">📅 Chuẩn bị bắt đầu tuần này</p>
            </div>
          </div>
        )}
      </section>

      {/* Kết quả nổi bật - với animated counters */}
      <StatsSection />
    </div>
  );
}
