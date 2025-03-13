// app/(routes)/admissions/page.js
import { getPage } from '@/lib/sanity.client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function AdmissionsPage() {
  const pageData = await getPage('admissions');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">{pageData?.title || 'Admissions'}</h1>
        
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Admission Process</h2>
            <ol className="space-y-4">
              {pageData?.admissionProcess?.map((step, index) => (
                <li key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-bold text-blue-600 dark:text-blue-400">Step {index + 1}:</span> {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Application Deadlines</h2>
            <div className="space-y-4">
              {pageData?.applicationDeadlines?.map((deadline, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span>{deadline.term}</span>
                  <span className="font-semibold">{deadline.date}</span>
                </div>
              ))}
            </div>
          </section>

          {pageData?.fees && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
              <div className="space-y-4">
                {Object.entries(pageData.fees).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="capitalize">{key}</span>
                    <span className="font-semibold">${value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}