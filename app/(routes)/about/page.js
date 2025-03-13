// app/(routes)/about/page.js
import { getPage, getStaffMembers } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default async function AboutPage() {
  const pageData = await getPage('about');
  const staff = await getStaffMembers();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">{pageData?.title || 'About Us'}</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{pageData?.mission}</p>
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{pageData?.vision}</p>
          </div>
          {pageData?.heroImage && (
            <Image
              src={urlFor(pageData.heroImage).width(800).height(600).url()}
              alt="About Us"
              width={800}
              height={600}
              className="rounded-lg shadow-xl"
            />
          )}
        </div>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Staff</h2>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {staff?.map((member) => (
              <div key={member._id} className="text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <Image
                  src={urlFor(member.image).width(400).height(400).url()}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{member.position}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">{member.email}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}