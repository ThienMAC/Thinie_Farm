import { getGuide, getGuideSlugs } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function GuidePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <article className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/guides"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          ← Quay lại trang kinh nghiệm
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {guide.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(guide.date).toLocaleDateString('vi-VN')}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
          <p className="text-xl text-gray-600">{guide.excerpt}</p>
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXRemote source={guide.content} />
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link 
            href="/guides"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Xem thêm kinh nghiệm khác
          </Link>
        </div>
      </div>
    </article>
  );
}
