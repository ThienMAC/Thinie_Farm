'use client';

import AnimatedCounter from './AnimatedCounter';

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Kết quả thử nghiệm</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Số liệu thật từ quá trình trồng rau, cập nhật liên tục
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Days to Harvest */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100 hover:scale-105 transition-transform">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
              <AnimatedCounter end={15} duration={2000} />
            </div>
            <div className="text-gray-700 font-medium">Ngày từ gieo đến thu</div>
            <div className="text-sm text-green-600 mt-2 font-medium">✓ Cải xanh lần 1</div>
          </div>

          {/* Survival Rate */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100 hover:scale-105 transition-transform">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
              <AnimatedCounter end={75} duration={2500} suffix="%" />
            </div>
            <div className="text-gray-700 font-medium">Tỷ lệ cây sống</div>
            <div className="text-sm text-green-600 mt-2 font-medium">✓ Khá tốt cho lần đầu</div>
          </div>

          {/* Harvest Weight */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100 hover:scale-105 transition-transform">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
              <AnimatedCounter end={0.2} duration={2000} decimals={1} suffix=" kg" />
            </div>
            <div className="text-gray-700 font-medium">Sản lượng thu hoạch</div>
            <div className="text-sm text-green-600 mt-2 font-medium">✓ Rau non thử nghiệm</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-8 italic">
          * Số liệu từ lần trồng cải xanh đầu tiên
        </p>
      </div>
    </section>
  );
}
