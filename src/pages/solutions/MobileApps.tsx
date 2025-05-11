
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MobileApps = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/solutions" className="text-soundblue-500 hover:underline mb-4 inline-block">
              ← Back to Solutions
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Phone className="h-8 w-8 text-soundblue-500" />
              <h1 className="text-4xl font-bold text-soundblue-500">Mobile Apps</h1>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Enhance your mobile applications with powerful voice AI technology that creates natural and 
              intuitive user experiences.
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
                    <strong className="font-medium">Seamless Integration</strong>
                    <p className="text-gray-600">Easy to implement SDKs for both iOS and Android with minimal code required.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Hands-Free Operation</strong>
                    <p className="text-gray-600">Enable users to navigate your app and perform actions without touching their device.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Offline Capabilities</strong>
                    <p className="text-gray-600">Process voice commands locally on the device for enhanced privacy and performance.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Navigation & Search</h3>
                  <p className="text-gray-600 mb-4">Enable users to search through your app content or navigate between screens using voice commands.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Content Creation</h3>
                  <p className="text-gray-600 mb-4">Allow users to dictate messages, create notes, or generate content hands-free.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                  <p className="text-gray-600 mb-4">Make your app more accessible to users with mobility limitations or visual impairments.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">In-App Assistants</h3>
                  <p className="text-gray-600 mb-4">Create voice-activated assistants that help users accomplish tasks within your application.</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
              <div className="flex items-start gap-8">
                <div className="flex-1">
                  <ol className="list-decimal pl-5 space-y-4">
                    <li className="text-gray-700">
                      <span className="font-medium">Create a developer account</span> on our platform
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Generate API keys</span> for your application
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Install our SDK</span> in your mobile application
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Configure voice commands</span> for your app's features
                    </li>
                  </ol>
                </div>
                <div className="flex-1">
                  <Button className="gradient-primary mb-4 w-full" asChild>
                    <Link to="/developers/documentation/ios-sdk">iOS SDK Documentation</Link>
                  </Button>
                  <Button className="gradient-primary mb-4 w-full" asChild>
                    <Link to="/developers/documentation/android-sdk">Android SDK Documentation</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/developers/documentation">View All Documentation</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Request a Demo</Button>
              <Button variant="outline">Contact Sales</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default MobileApps;
