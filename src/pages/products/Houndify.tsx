
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Houndify = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Houndify</h1>
            <p className="text-xl text-gray-700 mb-6">
              A comprehensive voice AI platform for developers that offers powerful tools and APIs to integrate advanced voice capabilities into any application or device.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Platform Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Complete SDK Toolkit</strong>
                    <p className="text-gray-600">Comprehensive SDKs for iOS, Android, Web, and IoT platforms with extensive documentation.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Custom Domain Creation</strong>
                    <p className="text-gray-600">Build domain-specific voice assistants with specialized knowledge and capabilities.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Developer Console</strong>
                    <p className="text-gray-600">Intuitive dashboard for managing applications, analyzing usage metrics, and optimizing performance.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Speech Recognition</h3>
                  <p className="text-gray-600">Industry-leading accuracy with support for 25+ languages and dialects.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Natural Language Understanding</h3>
                  <p className="text-gray-600">Advanced contextual processing with entity extraction and intent detection.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Voice Authentication</h3>
                  <p className="text-gray-600">Secure biometric authentication through voice patterns.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Customization</h3>
                  <p className="text-gray-600">Extensive ability to customize vocabulary, responses, and behavior.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Get Started</Button>
              <Button variant="outline">API Documentation</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Houndify;
