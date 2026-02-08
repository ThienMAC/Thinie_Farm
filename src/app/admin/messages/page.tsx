'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  subject: string | null;
  status: string;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('new');

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/contact?status=${filter}`);
      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      // Update status to 'read' - you'll need to add this API endpoint
      setMessages(messages.map(m => 
        m.id === id ? { ...m, status: 'read' } : m
      ));
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700',
      read: 'bg-gray-100 text-gray-700',
      replied: 'bg-green-100 text-green-700',
    };
    const labels = {
      new: 'Mới',
      read: 'Đã đọc',
      replied: 'Đã trả lời',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.new}`}>
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
              <h1 className="text-2xl font-bold">💬 Tin nhắn liên hệ</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Lọc:</span>
            <div className="flex gap-2">
              {['new', 'read', 'replied'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'new' ? 'Mới' : status === 'read' ? 'Đã đọc' : 'Đã trả lời'}
                </button>
              ))}
            </div>
            <span className="ml-auto text-sm text-gray-500">
              {messages.length} tin nhắn
            </span>
          </div>
        </div>

        {/* Messages List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold mb-2">Không có tin nhắn</h3>
            <p className="text-gray-600">Chưa có tin nhắn nào trong mục này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                      {getStatusBadge(message.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>📧 {message.email}</span>
                      {message.phone && <span>📱 {message.phone}</span>}
                      <span>📅 {new Date(message.created_at).toLocaleString('vi-VN')}</span>
                    </div>
                    {message.subject && (
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Chủ đề: {message.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${message.email}?subject=Re: ${message.subject || 'Liên hệ từ Thinie Farm'}`}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                  >
                    ✉️ Trả lời qua email
                  </a>
                  {message.phone && (
                    <a
                      href={`tel:${message.phone}`}
                      className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                    >
                      📞 Gọi điện
                    </a>
                  )}
                  {message.status === 'new' && (
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    >
                      ✓ Đánh dấu đã đọc
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
