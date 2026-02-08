import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-3xl transition-transform group-hover:scale-110">🌱</div>
          <div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">Thinie Farm</div>
            <div className="text-xs text-green-600 font-medium">Hành trình trồng rau thật</div>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group">
            Trang chủ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/farm-diary" className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group">
            Nhật ký
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/weekly-harvest" className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group">
            Thu hoạch
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/guides" className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group">
            Kinh nghiệm
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group">
            Về tôi
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-all hover:shadow-lg font-medium">
            Liên hệ
          </Link>
        </div>
      </nav>
    </header>
  );
}
