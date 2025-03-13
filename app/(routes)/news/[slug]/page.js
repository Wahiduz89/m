// app/(routes)/news/[slug]/page.js
import { getNewsBySlug } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default async function NewsPage({ params }) {
  const article = await getNewsBySlug(params.slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">The requested article does not exist.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
              {article.categories?.length > 0 && (
                <span>• {article.categories.map(cat => cat.title).join(', ')}</span>
              )}
            </div>
          </header>

          {article.mainImage && (
            <Image
              src={urlFor(article.mainImage).width(1200).height(800).url()}
              alt={article.title}
              width={1200}
              height={800}
              className="w-full h-96 object-cover rounded-lg mb-12"
            />
          )}

          <div className="prose dark:prose-invert max-w-none">
            {article.content}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}