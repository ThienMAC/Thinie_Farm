'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  href: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/test-db');
      const result = await response.json();
      if (result.success) {
        // For now, we'll use placeholder data
        setStats({
          total_diary_posts: 3,
          total_guides: 3,
          total_harvests: 3,
          total_kg_harvested: 4,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const statCards: StatCard[] = [
    {
      title: 'Nhật ký trồng rau',
      value: stats.total_diary_posts || 0,
      icon: '📖',
      color: 'from-green-500 to-emerald-500',
      href: '/admin/diary',
    },
    {
      title: 'Hướng dẫn',
      value: stats.total_guides || 0,
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
      href: '/admin/guides',
    },
    {
      title: 'Lượt thu hoạch',
      value: stats.total_harvests || 0,
      icon: '🌾',
      color: 'from-orange-500 to-amber-500',
      href: '/admin/harvests',
    },
    {
      title: 'Tổng kg thu hoạch',
      value: stats.total_kg_harvested || 0,
      icon: '⚖️',
      color: 'from-purple-500 to-pink-500',
      href: '/admin/harvests',
    },
  ];

  const quickActions = [
    { title: 'Viết nhật ký mới', icon: '✍️', href: '/admin/diary/new', color: 'green' },
    { title: 'Tạo hướng dẫn', icon: '📝', href: '/admin/guides/new', color: 'blue' },
    { title: 'Thêm thu hoạch', icon: '🌱', href: '/admin/harvests/new', color: 'orange' },
    { title: 'Xem tin nhắn', icon: '💬', href: '/admin/messages', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                🌱 Admin Panel
              </h1>
              <span className="text-sm text-gray-500">Thinie Farm</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                target="_blank"
              >
                Xem trang web →
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Chào mừng trở lại! 👋</h2>
          <p className="text-gray-600">Quản lý nội dung và theo dõi thống kê trang web của bạn</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              href={stat.href}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {stat.icon}
                </span>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-10`}></div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Hành động nhanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`bg-white rounded-xl p-6 border-2 border-${action.color}-100 hover:border-${action.color}-300 transition-all duration-300 group text-center`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <p className="font-semibold text-gray-900">{action.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Diary Posts */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">📖 Nhật ký</h3>
              <Link
                href="/admin/diary"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="space-y-3">
              <Link
                href="/admin/diary/new"
                className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <p className="font-medium text-sm">➕ Viết nhật ký mới</p>
              </Link>
              <Link
                href="/admin/diary"
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm">✏️ Chỉnh sửa bài viết</p>
              </Link>
            </div>
          </div>

          {/* Guides */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">📚 Hướng dẫn</h3>
              <Link
                href="/admin/guides"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="space-y-3">
              <Link
                href="/admin/guides/new"
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <p className="font-medium text-sm">➕ Tạo hướng dẫn mới</p>
              </Link>
              <Link
                href="/admin/guides"
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm">✏️ Chỉnh sửa hướng dẫn</p>
              </Link>
            </div>
          </div>

          {/* Messages & Subscribers */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">💬 Liên hệ</h3>
              <Link
                href="/admin/messages"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="space-y-3">
              <Link
                href="/admin/messages"
                className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <p className="font-medium text-sm">📨 Tin nhắn liên hệ</p>
              </Link>
              <Link
                href="/admin/subscribers"
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm">👥 Người đăng ký</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
