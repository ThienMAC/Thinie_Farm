'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.details || result.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setErrorMessage('Không thể kết nối. Vui lòng kiểm tra kết nối internet và thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitStatus('idle');
  };

  const contactMethods = [
    {
      icon: '💬',
      title: 'Zalo',
      value: '0123 456 789',
      description: 'Phản hồi nhanh nhất',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📧',
      title: 'Email',
      value: 'contact@thiniefarm.com',
      description: 'Trong vòng 24h',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📍',
      title: 'Địa chỉ',
      value: 'TP. Hồ Chí Minh',
      description: 'Có thể ghé thăm',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const faqs = [
    {
      q: '🌱 Rau có sạch không?',
      a: '100% không thuốc trừ sâu, trồng theo phương pháp tự nhiên',
    },
    {
      q: '📦 Giao hàng như thế nào?',
      a: 'Giao tận nơi trong ngày thu hoạch để đảm bảo độ tươi',
    },
    {
      q: '🕐 Thời gian phản hồi?',
      a: 'Thường trong vòng 2-4 giờ qua Zalo, 24h qua email',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">Sẵn sàng hỗ trợ bạn</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              📞 Liên hệ với Thinie Farm
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Có câu hỏi về trồng rau? Muốn đặt rau sạch?<br />
              Hoặc đơn giản chỉ muốn chia sẻ kinh nghiệm?<br />
              <span className="font-semibold text-green-600">Hãy liên hệ với tôi! 🌱</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-medium">Phản hồi nhanh</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl">🤝</span>
                <span className="text-sm font-medium">Tư vấn miễn phí</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl">🌿</span>
                <span className="text-sm font-medium">Thân thiện</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="container mx-auto px-4 -mt-12 mb-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${method.gradient}`}></div>
              <div className="p-6">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{method.title}</h3>
                <p className="font-semibold text-gray-900 mb-2">{method.value}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Form - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Gửi tin nhắn
                </h2>
                <p className="text-gray-600">
                  Điền form bên dưới và tôi sẽ phản hồi sớm nhất có thể
                </p>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <p className="font-semibold text-green-700 mb-1">Gửi thành công!</p>
                      <p className="text-sm text-green-600">
                        Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-red-700 mb-1">Có lỗi xảy ra</p>
                      <p className="text-sm text-red-600">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
                      Họ tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-700">
                    Số điện thoại (Zalo)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0123 456 789"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Ví dụ: Tôi muốn hỏi về cách trồng rau xà lách, hoặc đặt rau sạch giao tận nhà..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang gửi...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Gửi tin nhắn</span>
                      <span>→</span>
                    </span>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
                  <span>🔒</span>
                  <span>Thông tin của bạn được bảo mật và chỉ dùng để phản hồi</span>
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>💡</span>
                <span>Câu hỏi thường gặp</span>
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-semibold text-sm mb-2 text-gray-800">{faq.q}</p>
                    <p className="text-sm text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span>⏰</span>
                <span>Thời gian phản hồi</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💬</span>
                  <div>
                    <p className="font-semibold text-sm">Zalo</p>
                    <p className="text-sm text-gray-600">2-4 giờ (nhanh nhất)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-sm text-gray-600">Trong vòng 24 giờ</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📝</span>
                  <div>
                    <p className="font-semibold text-sm">Form liên hệ</p>
                    <p className="text-sm text-gray-600">24-48 giờ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-md">
              <div className="text-center">
                <p className="text-3xl mb-3">🌱</p>
                <h3 className="font-bold mb-2">Ghé thăm vườn rau?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Bạn có thể đến tận nơi để xem cách tôi trồng rau và học hỏi kinh nghiệm
                </p>
                <div className="bg-white rounded-lg p-3 text-sm">
                  <p className="text-gray-500 mb-1">Địa chỉ</p>
                  <p className="font-semibold">TP. Hồ Chí Minh</p>
                  <p className="text-xs text-gray-500 mt-2">
                    (Liên hệ trước để hẹn lịch)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #10b98120 1px, transparent 1px),
            linear-gradient(to bottom, #10b98120 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
