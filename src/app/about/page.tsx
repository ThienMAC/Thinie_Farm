const timeline = [
  {
    date: 'Tháng 1/2026',
    title: 'Bắt đầu từ con số 0',
    description: 'Quyết định thử nghiệm trồng rau. Không có kinh nghiệm, chỉ có niềm đam mê.',
    icon: '🌱',
    color: 'green'
  },
  {
    date: 'Tháng 2/2026',
    title: 'Lần gieo hạt đầu tiên',
    description: 'Thử với cải xanh - loại rau được cho là dễ nhất. Học cách tưới nước, chăm sóc hàng ngày.',
    icon: '🌿',
    color: 'blue'
  },
  {
    date: 'Hiện tại',
    title: 'Đang mở rộng thử nghiệm',
    description: 'Thử nhiều loại rau khác nhau, các mô hình trồng khác nhau. Ghi lại từng bước.',
    icon: '📊',
    color: 'purple'
  },
  {
    date: 'Tương lai',
    title: 'Chia sẻ & phát triển',
    description: 'Mục tiêu có nguồn rau sạch ổn định, chia sẻ kinh nghiệm, có thể bán thử cho cộng đồng.',
    icon: '🚀',
    color: 'orange'
  },
];

const stats = [
  { value: '30+', label: 'Ngày trồng rau', icon: '📅', color: 'green' },
  { value: '3', label: 'Loại rau đã thử', icon: '🌱', color: 'blue' },
  { value: '10+', label: 'Bài học đã có', icon: '💡', color: 'purple' },
  { value: '100%', label: 'Minh bạch', icon: '🎯', color: 'orange' },
];

const values = [
  {
    icon: '🔍',
    title: 'Minh bạch',
    description: 'Chia sẻ cả thành công lẫn thất bại. Số liệu thật, kết quả thật.',
    color: 'from-green-100 to-emerald-100'
  },
  {
    icon: '📚',
    title: 'Học hỏi',
    description: 'Mỗi vụ trồng là một bài học. Ghi chép chi tiết để cải thiện.',
    color: 'from-blue-100 to-cyan-100'
  },
  {
    icon: '🤝',
    title: 'Chia sẻ',
    description: 'Kinh nghiệm của tôi có thể giúp bạn bắt đầu dễ dàng hơn.',
    color: 'from-purple-100 to-indigo-100'
  },
  {
    icon: '✨',
    title: 'Chất lượng',
    description: 'Rau sạch thật sự, không thuốc trừ sâu, chăm sóc tận tâm.',
    color: 'from-orange-100 to-amber-100'
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Avatar/Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium text-green-700">Người mới bắt đầu</span>
            </div>
            
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-xl">
                👨‍🌾
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Câu chuyện của tôi
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Tôi không phải nông dân chuyên nghiệp. Đây là hành trình học trồng rau từ con số 0 - 
              với mục tiêu có nguồn thực phẩm sạch cho gia đình và chia sẻ kinh nghiệm thực tế.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-200 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={`text-3xl font-bold mb-1 ${
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Hành trình của tôi</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-blue-200 via-purple-200 to-orange-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1">
                    <div className={`bg-gradient-to-br ${
                      item.color === 'green' ? 'from-green-50 to-emerald-50' :
                      item.color === 'blue' ? 'from-blue-50 to-cyan-50' :
                      item.color === 'purple' ? 'from-purple-50 to-indigo-50' :
                      'from-orange-50 to-amber-50'
                    } rounded-2xl p-6 border-2 border-white shadow-lg hover:shadow-xl transition-all`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                          item.color === 'green' ? 'bg-green-100' :
                          item.color === 'blue' ? 'bg-blue-100' :
                          item.color === 'purple' ? 'bg-purple-100' :
                          'bg-orange-100'
                        }`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-semibold text-gray-500">{item.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                    item.color === 'green' ? 'bg-green-500' :
                    item.color === 'blue' ? 'bg-blue-500' :
                    item.color === 'purple' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}></div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Giá trị cốt lõi</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 border-2 border-white shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-10 border-2 border-indigo-200">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Mục tiêu của dự án</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏡</span>
                    <div>
                      <h3 className="font-bold mb-2">Cho gia đình</h3>
                      <p className="text-sm text-gray-700">Có nguồn rau sạch tự trồng, biết rõ nguồn gốc</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔬</span>
                    <div>
                      <h3 className="font-bold mb-2">Thử nghiệm</h3>
                      <p className="text-sm text-gray-700">Tìm hiểu các mô hình trồng rau hiện đại</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <h3 className="font-bold mb-2">Ghi chép</h3>
                      <p className="text-sm text-gray-700">Lưu lại quá trình học hỏi một cách chi tiết</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <h3 className="font-bold mb-2">Chia sẻ</h3>
                      <p className="text-sm text-gray-700">Giúp người khác cũng bắt đầu dễ dàng hơn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Website Section */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 border-2 border-gray-100 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-3xl">💭</span>
              Tại sao làm website này?
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Để ghi lại hành trình một cách <strong>minh bạch</strong>. Không phải để khoe thành quả, 
                mà để chia sẻ cả những <strong>thất bại</strong>, những <strong>bài học</strong>, 
                và những điều học được trong quá trình.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nếu bạn cũng đang muốn thử trồng rau nhưng chưa biết bắt đầu từ đâu, 
                hy vọng những ghi chép này sẽ hữu ích cho bạn.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-3xl font-bold mb-4">Cùng trao đổi nhé!</h2>
              
              <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
                Bạn cũng đang trồng rau? Hoặc đang muốn bắt đầu?<br />
                Hãy liên hệ để chúng ta cùng chia sẻ kinh nghiệm!
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-full hover:bg-green-50 transition-all shadow-lg hover:shadow-xl font-bold text-lg"
                >
                  <span>Liên hệ với tôi</span>
                  <span>✉️</span>
                </a>
                
                <a 
                  href="/farm-diary" 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full hover:bg-white/30 transition-all font-semibold text-lg"
                >
                  <span>Xem nhật ký</span>
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
