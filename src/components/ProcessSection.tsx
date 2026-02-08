'use client';

import ProcessStep from './ProcessStep';

const processSteps = [
  { step: 'Gieo hạt', icon: '🌱', color: 'green' as const },
  { step: 'Chăm sóc', icon: '💧', color: 'blue' as const },
  { step: 'Theo dõi', icon: '📊', color: 'purple' as const },
  { step: 'Thu hoạch', icon: '🥬', color: 'orange' as const },
  { step: 'Ghi nhận kết quả', icon: '📝', color: 'pink' as const }
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Quy trình minh bạch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Từng bước được ghi lại chi tiết, không bỏ sót
          </p>
        </div>

        {/* Desktop view - horizontal */}
        <div className="hidden lg:flex flex-wrap justify-center items-center gap-2 max-w-6xl mx-auto">
          {processSteps.map((item, index) => (
            <ProcessStep
              key={item.step}
              step={item.step}
              icon={item.icon}
              number={index + 1}
              color={item.color}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>

        {/* Tablet/Mobile view - vertical with smaller arrows */}
        <div className="lg:hidden flex flex-col items-center gap-4 max-w-md mx-auto">
          {processSteps.map((item, index) => (
            <div key={item.step} className="w-full">
              <ProcessStep
                step={item.step}
                icon={item.icon}
                number={index + 1}
                color={item.color}
                isLast={true}
              />
              {index < processSteps.length - 1 && (
                <div className="flex justify-center my-2">
                  <span className="text-3xl text-green-400 animate-bounce">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-16 max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border-2 border-green-100 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="text-4xl">✨</div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Tại sao minh bạch?</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Mỗi bước trong quy trình được ghi lại bằng ảnh và nhật ký chi tiết. 
                Bạn có thể thấy chính xác cách tôi trồng, chăm sóc và thu hoạch rau.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                  📸 Ảnh thật
                </span>
                <span className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                  📅 Ghi ngày giờ
                </span>
                <span className="text-sm bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200">
                  📊 Số liệu đo đạc
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
