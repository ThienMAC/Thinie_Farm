import { Product } from '@/types';

// Mock data - sẽ thay bằng database sau
const products: Product[] = [
  // Sẽ được cập nhật khi có thu hoạch thật
];

// Sample upcoming harvests - for demonstration
const upcomingHarvests = [
  { name: 'Cải xanh', icon: '🥬', daysLeft: 8, progress: 65 },
  { name: 'Rau muống', icon: '🌿', daysLeft: 5, progress: 80 },
  { name: 'Xà lách', icon: '🥗', daysLeft: 12, progress: 45 },
];

const harvestStats = [
  { label: 'Tổng thu hoạch', value: '0', unit: 'kg', icon: '⚖️', color: 'green' },
  { label: 'Đợt thu hoạch', value: '0', unit: 'lần', icon: '📦', color: 'blue' },
  { label: 'Đang trồng', value: '3', unit: 'loại rau', icon: '🌱', color: 'purple' },
];

export default function WeeklyHarvestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">Cập nhật hàng tuần</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Thu hoạch tuần này
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Rau tươi từ vườn nhà - ghi lại từng gam thu hoạch thực tế
            </p>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {harvestStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-white shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className={`text-3xl font-bold mb-1 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    'text-purple-600'
                  }`}>
                    {stat.value}
                    <span className="text-lg ml-1 text-gray-500">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* Upcoming Harvests Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Sắp thu hoạch</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingHarvests.map((harvest, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-200 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 border-green-100">
                    {harvest.icon}
                  </div>
                  <div className="bg-amber-50 border-2 border-amber-200 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-amber-700">{harvest.daysLeft} ngày</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{harvest.name}</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Độ trưởng thành</span>
                    <span className="font-semibold text-green-600">{harvest.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${harvest.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        {products.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Đã thu hoạch</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-green-200 transition-all group">
                  <div className="relative h-56 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl group-hover:scale-110 transition-transform">🥬</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 backdrop-blur-sm ${
                        product.status === 'bán thử' ? 'bg-green-100/90 text-green-700 border-green-300' :
                        product.status === 'hết hàng' ? 'bg-gray-100/90 text-gray-700 border-gray-300' :
                        'bg-yellow-100/90 text-yellow-700 border-yellow-300'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-4">{product.name}</h3>
                    
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">🌱</span>
                        <div>
                          <div className="text-xs text-gray-500">Gieo hạt</div>
                          <div className="font-semibold text-gray-900">{product.plantDate}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">✂️</span>
                        <div>
                          <div className="text-xs text-gray-500">Thu hoạch</div>
                          <div className="font-semibold text-gray-900">{product.harvestDate}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">📦</span>
                        <div>
                          <div className="text-xs text-gray-500">Số lượng</div>
                          <div className="font-semibold text-gray-900">{product.quantity}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-12 border-2 border-amber-200 text-center">
              <div className="text-8xl mb-6 animate-bounce">🌾</div>
              
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Đợt thu hoạch đầu tiên đang đến gần!
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Hiện tại đang có <strong>3 loại rau</strong> đang phát triển tốt. 
                Trong vài ngày tới sẽ có kết quả thu hoạch đầu tiên.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-amber-200">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-bold text-lg mb-2">Theo dõi chi tiết</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Mỗi đợt thu hoạch sẽ ghi lại:<br />
                    • Loại rau, ngày gieo/thu<br />
                    • Khối lượng chính xác<br />
                    • Chất lượng và tình trạng<br />
                    • Hình ảnh thực tế
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-amber-200">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-bold text-lg mb-2">Minh bạch 100%</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Chia sẻ cả thành công lẫn thất bại:<br />
                    • Tỷ lệ sống thực tế<br />
                    • Bài học từ mỗi vụ<br />
                    • Cải tiến quy trình<br />
                    • Chi phí và hiệu quả
                  </p>
                </div>
              </div>

              <a 
                href="/farm-diary" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <span>Xem nhật ký trồng trọt</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-10 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">🔔</span>
                <h2 className="text-3xl font-bold">Nhận thông báo khi có rau mới</h2>
              </div>
              
              <p className="text-lg text-blue-50 mb-8 max-w-2xl">
                Đăng ký để được thông báo ngay khi có đợt thu hoạch mới. 
                Tôi sẽ gửi thông tin qua <strong>Zalo</strong> hoặc <strong>Email</strong> - 
                bao gồm loại rau, số lượng và thời gian nhận hàng.
              </p>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl font-bold text-lg"
                >
                  <span>Đăng ký ngay</span>
                  <span>✨</span>
                </a>
                
                <a 
                  href="/about" 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full hover:bg-white/30 transition-all font-semibold text-lg"
                >
                  <span>Tìm hiểu về dự án</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
