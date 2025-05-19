
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const VoiceSearch = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Voice Search</h1>
            <p className="text-xl text-gray-700 mb-6">
              Intelligent search powered by voice commands, allowing users to find information quickly and effectively using natural language queries.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Semantic Understanding</strong>
                    <p className="text-gray-600">Our technology understands the meaning behind queries, not just keywords, for more accurate results.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Noise Resilience</strong>
                    <p className="text-gray-600">Advanced filtering ensures accurate recognition even in noisy environments.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Contextual Results</strong>
                    <p className="text-gray-600">Search results that account for user preferences, history, and situational context.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Implementation Examples</h2>
              <p className="text-gray-700 mb-4">
                <strong>E-commerce:</strong> Allow customers to search for products using voice commands, describing features rather than knowing exact product names.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Content Platforms:</strong> Enable users to search for videos, articles, or music through conversational queries.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Enterprise Applications:</strong> Improve efficiency by letting employees search through company resources using voice commands.
              </p>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Integrate Now</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default VoiceSearch;
