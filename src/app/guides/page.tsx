import { getGuides } from '@/lib/api';
import Link from 'next/link';

// Categories for filtering (future feature)
const categories = [
  { name: 'Tất cả', icon: '📚', color: 'gray' },
  { name: 'Người mới', icon: '🌱', color: 'green' },
  { name: 'Kỹ thuật', icon: '🔧', color: 'blue' },
  { name: 'Thiết bị', icon: '🛠️', color: 'purple' },
  { name: 'Lỗi thường gặp', icon: '⚠️', color: 'orange' },
];

const learningPath = [
  { 
    step: 1, 
    title: 'Bắt đầu', 
    desc: 'Chọn rau dễ trồng, chuẩn bị dụng cụ cơ bản',
    icon: '🌱',
    color: 'green'
  },
  { 
    step: 2, 
    title: 'Thực hành', 
    desc: 'Gieo hạt đầu tiên, học cách tưới nước',
    icon: '💧',
    color: 'blue'
  },
  { 
    step: 3, 
    title: 'Phát triển', 
    desc: 'Mở rộng loại rau, thử nghiệm mô hình',
    icon: '🌿',
    color: 'purple'
  },
  { 
    step: 4, 
    title: 'Tinh chỉnh', 
    desc: 'Tối ưu quy trình, tăng năng suất',
    icon: '📈',
    color: 'orange'
  },
];

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
              <span className="text-sm font-medium text-blue-700">Kinh nghiệm từ người mới</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hướng dẫn trồng rau
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Những bài học thực tế từ người mới bắt đầu - dễ hiểu, dễ làm theo
            </p>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                    index === 0 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                      : 'bg-white/90 text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        {/* Learning Path */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Lộ trình học</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {learningPath.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold ${
                    step.color === 'green' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                    step.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                    step.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-indigo-500' :
                    'bg-gradient-to-br from-orange-500 to-amber-500'
                  }`}>
                    {step.step}
                  </div>
                  
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
                
                {/* Arrow connector */}
                {index < learningPath.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guides List */}
        {guides.length > 0 ? (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Bài viết hướng dẫn</h2>
              <span className="ml-auto text-sm text-gray-500">{guides.length} bài viết</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all group h-full">
                    {/* Gradient header */}
                    <div className={`h-32 bg-gradient-to-br relative overflow-hidden ${
                      index % 5 === 0 ? 'from-green-100 via-emerald-100 to-teal-100' :
                      index % 5 === 1 ? 'from-blue-100 via-cyan-100 to-sky-100' :
                      index % 5 === 2 ? 'from-purple-100 via-violet-100 to-indigo-100' :
                      index % 5 === 3 ? 'from-orange-100 via-amber-100 to-yellow-100' :
                      'from-pink-100 via-rose-100 to-red-100'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl group-hover:scale-110 transition-transform">
                          {index % 5 === 0 ? '🌱' :
                           index % 5 === 1 ? '💧' :
                           index % 5 === 2 ? '🔧' :
                           index % 5 === 3 ? '📊' : '🌿'}
                        </span>
                      </div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border-2 border-white">
                          {guide.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {guide.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {guide.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          {new Date(guide.date).toLocaleDateString('vi-VN')}
                        </span>
                        
                        <span className="text-blue-600 font-semibold group-hover:gap-2 flex items-center transition-all">
                          Đọc tiếp
                          <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 border-2 border-indigo-200 text-center">
              <div className="text-8xl mb-6">📚</div>
              
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Kinh nghiệm đang được tích lũy
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Trong quá trình trồng rau, tôi sẽ ghi lại những bài học thực tế để chia sẻ với cộng đồng.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="text-3xl mb-3">🌱</div>
                  <h3 className="font-bold text-lg mb-2">Cho người mới</h3>
                  <ul className="text-sm text-gray-600 text-left space-y-1">
                    <li>• Chọn rau dễ trồng</li>
                    <li>• Dụng cụ tối thiểu</li>
                    <li>• Lỗi thường gặp</li>
                    <li>• Tips tiết kiệm</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="text-3xl mb-3">🔧</div>
                  <h3 className="font-bold text-lg mb-2">Kỹ thuật</h3>
                  <ul className="text-sm text-gray-600 text-left space-y-1">
                    <li>• Cách gieo hạt đúng</li>
                    <li>• Tưới nước hợp lý</li>
                    <li>• Chăm sóc hàng ngày</li>
                    <li>• Phòng trừ sâu bệnh</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-bold text-lg mb-2">So sánh</h3>
                  <ul className="text-sm text-gray-600 text-left space-y-1">
                    <li>• Các mô hình trồng</li>
                    <li>• Loại đất phù hợp</li>
                    <li>• Chi phí thực tế</li>
                    <li>• Hiệu quả đầu tư</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200 max-w-2xl mx-auto mb-8">
                <h3 className="font-bold text-lg mb-3">💡 Cam kết của tôi</h3>
                <p className="text-sm text-gray-700">
                  Mỗi bài viết sẽ dựa trên <strong>kinh nghiệm thực tế</strong>, 
                  không copy paste từ internet. Chia sẻ cả <strong>thành công lẫn thất bại</strong>, 
                  với số liệu và hình ảnh minh họa rõ ràng.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="/farm-diary" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  <span>Xem nhật ký trồng trọt</span>
                  <span>→</span>
                </a>
                
                <a 
                  href="/about" 
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 border-2 border-indigo-200 px-8 py-4 rounded-full hover:bg-indigo-50 transition-all font-semibold text-lg"
                >
                  <span>Về dự án Thinie Farm</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-3xl font-bold mb-4">Có câu hỏi về trồng rau?</h2>
              
              <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
                Tôi vẫn đang học hỏi nhưng rất vui được chia sẻ và trao đổi kinh nghiệm. 
                Hãy liên hệ nếu bạn muốn cùng thảo luận!
              </p>

              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-full hover:bg-green-50 transition-all shadow-lg hover:shadow-xl font-bold text-lg"
              >
                <span>Liên hệ với tôi</span>
                <span>✉️</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
