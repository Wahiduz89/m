// app/(routes)/page.js (Home)
import { getPage, getUpcomingEvents } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default async function Home() {
  const pageData = await getPage('home');
  const events = await getUpcomingEvents(3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        {pageData?.heroImage && (
          <Image
            src={urlFor(pageData.heroImage).width(1920).height(1080).url()}
            alt="School Campus"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {pageData?.title || 'Welcome to Our School'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {pageData?.subtitle || 'Excellence in Education'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {/* Announcements */}
        {pageData?.announcements?.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-800 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Latest Announcements</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {pageData.announcements.map((announcement) => (
                  <div key={announcement._id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{announcement.excerpt}</p>
                    <time className="text-sm text-blue-600 dark:text-blue-400">
                      {new Date(announcement.date).toLocaleDateString()}
                    </time>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {events?.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {events.map((event) => (
                  <div key={event._id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                    {event.image && (
                      <Image
                        src={urlFor(event.image).width(600).height(400).url()}
                        alt={event.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                      <div className="flex justify-between text-sm">
                        <time className="text-blue-600 dark:text-blue-400">
                          {new Date(event.date).toLocaleDateString()}
                        </time>
                        <span className="text-gray-500 dark:text-gray-400">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}