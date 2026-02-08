'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewDiaryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    plant_name: '',
    plant_date: '',
    harvest_date: '',
    days_to_harvest: '',
    survival_rate: '',
    harvest_weight: '',
    planting_method: '',
    watering_frequency: '',
    lessons_learned: '',
    images: '',
    status: 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Process lessons_learned và images
      const lessons = formData.lessons_learned
        ? formData.lessons_learned.split('\n').filter(l => l.trim())
        : [];
      
      const images = formData.images
        ? formData.images.split('\n').filter(i => i.trim())
        : [];

      const postData = {
        ...formData,
        days_to_harvest: formData.days_to_harvest ? parseInt(formData.days_to_harvest) : null,
        survival_rate: formData.survival_rate ? parseFloat(formData.survival_rate) : null,
        harvest_weight: formData.harvest_weight ? parseFloat(formData.harvest_weight) : null,
        lessons_learned: lessons,
        images: images,
        published_at: formData.status === 'published' ? new Date().toISOString() : null,
      };

      const response = await fetch('/api/admin/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Tạo nhật ký thành công!');
        router.push('/admin/diary');
      } else {
        alert('Lỗi: ' + result.error);
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo nhật ký');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/diary"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Quay lại
              </Link>
              <h1 className="text-2xl font-bold">✍️ Viết nhật ký mới</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">📝 Thông tin cơ bản</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Nhật ký #1 - Xà lách lần đầu tiên"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Slug (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="xa-lach-lan-1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">URL: /farm-diary/{formData.slug}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tóm tắt <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Mô tả ngắn gọn về bài viết..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nội dung (Markdown) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={15}
                  placeholder="# Tiêu đề&#10;&#10;Nội dung bài viết với Markdown..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-mono text-sm resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hỗ trợ Markdown: # tiêu đề, **bold**, *italic*, - list, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Farming Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">🌱 Chi tiết gieo trồng</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tên rau <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="plant_name"
                  value={formData.plant_name}
                  onChange={handleChange}
                  required
                  placeholder="Xà lách"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Ngày gieo <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="plant_date"
                  value={formData.plant_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Ngày thu hoạch
                </label>
                <input
                  type="date"
                  name="harvest_date"
                  value={formData.harvest_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Số ngày đến thu hoạch
                </label>
                <input
                  type="number"
                  name="days_to_harvest"
                  value={formData.days_to_harvest}
                  onChange={handleChange}
                  placeholder="30"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tỷ lệ sống (%)
                </label>
                <input
                  type="number"
                  name="survival_rate"
                  value={formData.survival_rate}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="85.5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Khối lượng thu hoạch (kg)
                </label>
                <input
                  type="number"
                  name="harvest_weight"
                  value={formData.harvest_weight}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="1.2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Cách gieo trồng
                </label>
                <input
                  type="text"
                  name="planting_method"
                  value={formData.planting_method}
                  onChange={handleChange}
                  placeholder="Gieo hạt trong khay xốp 72 ô"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Tần suất tưới nước
                </label>
                <input
                  type="text"
                  name="watering_frequency"
                  value={formData.watering_frequency}
                  onChange={handleChange}
                  placeholder="Tưới 2 lần/ngày vào sáng và chiều"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">💡 Bài học & Hình ảnh</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Bài học kinh nghiệm (mỗi dòng 1 bài học)
                </label>
                <textarea
                  name="lessons_learned"
                  value={formData.lessons_learned}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Cần ánh sáng nhiều&#10;Không tưới quá nhiều nước&#10;Nên giảm mật độ gieo"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-mono text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  URLs hình ảnh (mỗi dòng 1 URL)
                </label>
                <textarea
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  rows={4}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-mono text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/admin/diary"
                  className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Hủy
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold disabled:opacity-50"
                >
                  {isLoading ? 'Đang lưu...' : 'Tạo nhật ký'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
