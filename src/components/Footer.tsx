export default function Footer() {
  return (
    <footer className="border-t border-green-100 bg-gradient-to-b from-white to-green-50/30 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌱</span>
              <h3 className="font-bold text-xl text-gray-900">Thinie Farm</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Hành trình trồng rau sạch từ con số 0.<br />
              Ghi lại quá trình thật, kết quả thật,<br />
              không màu mè.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Khám phá</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/farm-diary" className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                  <span className="text-green-500 group-hover:translate-x-1 transition-transform">→</span>
                  Nhật ký gieo trồng
                </a>
              </li>
              <li>
                <a href="/weekly-harvest" className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                  <span className="text-green-500 group-hover:translate-x-1 transition-transform">→</span>
                  Thu hoạch tuần
                </a>
              </li>
              <li>
                <a href="/guides" className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                  <span className="text-green-500 group-hover:translate-x-1 transition-transform">→</span>
                  Kinh nghiệm trồng rau
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">📧</span>
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-gray-700 font-medium">contact@thiniefarm.com</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">📱</span>
                <div>
                  <p className="text-gray-500 text-xs">Zalo</p>
                  <p className="text-gray-700 font-medium">0123 456 789</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-100 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Thinie Farm. Hành trình trồng rau thật.
          </p>
          <p className="text-xs text-gray-400">
            Made with ❤️ and 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}
