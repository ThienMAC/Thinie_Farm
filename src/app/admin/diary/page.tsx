'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DiaryPost {
  id: string;
  slug: string;
  title: string;
  plant_name: string;
  status: string;
  published_at: string | null;
  created_at: string;
}

export default function AdminDiaryPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<DiaryPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/admin/diary?status=${filter}`);
      const result = await response.json();
      if (result.success) {
        setPosts(result.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Xóa bài "${title}"?\n\nHành động này không thể hoàn tác.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/diary?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        setPosts(posts.filter(p => p.id !== id));
      } else {
        alert('Lỗi khi xóa bài viết');
      }
    } catch (error) {
      alert('Lỗi khi xóa bài viết');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-700',
    };
    const labels = {
      published: 'Đã xuất bản',
      draft: 'Nháp',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.draft}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold">📖 Quản lý Nhật ký</h1>
            </div>
            <Link
              href="/admin/diary/new"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold"
            >
              ➕ Viết nhật ký mới
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Lọc:</span>
            <div className="flex gap-2">
              {['all', 'published', 'draft'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'Tất cả' : status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                </button>
              ))}
            </div>
            <span className="ml-auto text-sm text-gray-500">
              {posts.length} bài viết
            </span>
          </div>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Chưa có nhật ký nào</h3>
            <p className="text-gray-600 mb-6">Bắt đầu viết nhật ký đầu tiên của bạn</p>
            <Link
              href="/admin/diary/new"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              ➕ Viết nhật ký mới
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                      {getStatusBadge(post.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>🌱 {post.plant_name}</span>
                      <span>🔗 /{post.slug}</span>
                      <span>
                        📅 {post.published_at 
                          ? new Date(post.published_at).toLocaleDateString('vi-VN')
                          : new Date(post.created_at).toLocaleDateString('vi-VN')
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/farm-diary/${post.slug}`}
                      target="_blank"
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                      👁️ Xem
                    </Link>
                    <Link
                      href={`/admin/diary/edit/${post.id}`}
                      className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                    >
                      ✏️ Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
