'use client';

import { useState } from 'react';

interface SubscribeFormProps {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export default function SubscribeForm({ variant = 'default', className = '' }: SubscribeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notification_method: 'email',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', notification_method: 'email' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.details || result.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      setSubmitStatus('error');
      setErrorMessage('Không thể kết nối. Vui lòng kiểm tra kết nối internet và thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitStatus('idle');
  };

  if (variant === 'inline') {
    return (
      <div className={className}>
        {submitStatus === 'success' ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <span className="text-2xl mb-2 block">✓</span>
            <p className="font-semibold text-green-700">Đăng ký thành công!</p>
            <p className="text-sm text-green-600 mt-1">Cảm ơn bạn đã theo dõi</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email của bạn"
              required
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
            >
              {isSubmitting ? '...' : 'Đăng ký'}
            </button>
          </form>
        )}
        {submitStatus === 'error' && (
          <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 ${className}`}>
        <div className="text-center mb-4">
          <span className="text-3xl mb-2 block">📬</span>
          <h3 className="font-bold text-lg mb-1">Nhận thông báo mới</h3>
          <p className="text-sm text-gray-600">Cập nhật khi có rau mới thu hoạch</p>
        </div>

        {submitStatus === 'success' ? (
          <div className="p-4 bg-white rounded-lg text-center border-2 border-green-200">
            <span className="text-2xl mb-2 block">✓</span>
            <p className="font-semibold text-green-700">Đăng ký thành công!</p>
            <p className="text-sm text-green-600 mt-1">Cảm ơn bạn đã theo dõi</p>
          </div>
        ) : (
          <>
            {submitStatus === 'error' && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên của bạn"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email của bạn"
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Đăng ký nhận thông báo'}
              </button>
            </form>
          </>
        )}
      </div>
    );
  }

  // Default variant - full form
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">📬</span>
        <h3 className="font-bold text-2xl mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Đăng ký nhận thông báo
        </h3>
        <p className="text-gray-600">
          Nhận cập nhật khi có rau mới thu hoạch và mẹo trồng rau hữu ích
        </p>
      </div>

      {submitStatus === 'success' ? (
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-center">
          <span className="text-4xl mb-3 block">✓</span>
          <p className="font-bold text-green-700 text-lg mb-2">Đăng ký thành công!</p>
          <p className="text-green-600">
            Cảm ơn bạn đã theo dõi Thinie Farm. Chúng tôi sẽ gửi thông báo khi có cập nhật mới.
          </p>
        </div>
      ) : (
        <>
          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold text-red-700">Có lỗi xảy ra</p>
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="sub-name" className="block text-sm font-semibold mb-2 text-gray-700">
                Tên của bạn
              </label>
              <input
                type="text"
                id="sub-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="sub-email" className="block text-sm font-semibold mb-2 text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="sub-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="sub-phone" className="block text-sm font-semibold mb-2 text-gray-700">
                Số điện thoại (tùy chọn)
              </label>
              <input
                type="tel"
                id="sub-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0123 456 789"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="sub-method" className="block text-sm font-semibold mb-2 text-gray-700">
                Nhận thông báo qua
              </label>
              <select
                id="sub-method"
                name="notification_method"
                value={formData.notification_method}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="email">Email</option>
                <option value="phone">Điện thoại / Zalo</option>
              </select>
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
                  Đang xử lý...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Đăng ký ngay</span>
                  <span>→</span>
                </span>
              )}
            </button>

            <p className="text-sm text-gray-500 text-center">
              🔒 Thông tin của bạn được bảo mật
            </p>
          </form>
        </>
      )}
    </div>
  );
}
