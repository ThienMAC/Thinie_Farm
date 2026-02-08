import { getFarmDiaryPosts } from '@/lib/api';
import DiaryCard from '@/components/DiaryCard';

export default async function FarmDiaryPage() {
  const posts = await getFarmDiaryPosts();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">📅 Nhật ký gieo trồng</h1>
          <p className="text-xl text-gray-600">
            Ghi lại từng bước trồng rau - từ gieo hạt đến thu hoạch.<br />
            Kết quả thật, không chỉnh sửa.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <DiaryCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-6">🌱</div>
            <h2 className="text-2xl font-bold mb-4">Hành trình sắp bắt đầu</h2>
            <p className="text-gray-600 mb-6">
              Nhật ký gieo trồng sẽ được cập nhật thường xuyên khi bắt đầu trồng rau.<br />
              Mỗi bài viết sẽ ghi lại chi tiết quá trình, kết quả và bài học rút ra.
            </p>
            <div className="bg-white p-6 rounded-lg max-w-md mx-auto text-left">
              <h3 className="font-bold mb-3">Mỗi nhật ký sẽ có:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Ngày gieo hạt</li>
                <li>✓ Cách gieo và chăm sóc</li>
                <li>✓ Ảnh từng giai đoạn</li>
                <li>✓ Tỷ lệ cây sống</li>
                <li>✓ Kết quả thu hoạch</li>
                <li>✓ Bài học kinh nghiệm</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
