
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Documentation</h1>
            <p className="text-xl text-gray-700 mb-8">
              Comprehensive guides, references, and examples to help you integrate and optimize our voice technology.
            </p>

            <Tabs defaultValue="getting-started" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="apis">APIs & SDKs</TabsTrigger>
                <TabsTrigger value="guides">Advanced Guides</TabsTrigger>
              </TabsList>
              <TabsContent value="getting-started" className="p-4 border rounded-lg mt-2">
                <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Platform Overview</h3>
                    <p className="text-gray-600 mb-2">Learn about our voice technology platform and its capabilities.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Quick Start Guide</h3>
                    <p className="text-gray-600 mb-2">Get up and running with your first voice-enabled application in minutes.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Account Setup</h3>
                    <p className="text-gray-600 mb-2">Create an account, generate API keys, and set up your developer environment.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Core Concepts</h3>
                    <p className="text-gray-600 mb-2">Understand the fundamental concepts and architecture of our voice technology.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="apis" className="p-4 border rounded-lg mt-2">
                <h2 className="text-2xl font-semibold mb-4">APIs & SDKs</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">REST API Reference</h3>
                    <p className="text-gray-600 mb-2">Complete reference for our HTTP API endpoints, request formats, and responses.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">iOS SDK</h3>
                    <p className="text-gray-600 mb-2">Integrate voice capabilities into your iOS applications with our Swift SDK.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Android SDK</h3>
                    <p className="text-gray-600 mb-2">Add voice interactions to your Android apps with our Kotlin/Java SDK.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Web SDK</h3>
                    <p className="text-gray-600 mb-2">Implement voice features in web applications using our JavaScript SDK.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="guides" className="p-4 border rounded-lg mt-2">
                <h2 className="text-2xl font-semibold mb-4">Advanced Guides</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Voice Assistant Implementation</h3>
                    <p className="text-gray-600 mb-2">Learn how to build a full-featured voice assistant using our platform.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Custom Domain Creation</h3>
                    <p className="text-gray-600 mb-2">Create domain-specific voice models tailored to your application's needs.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Performance Optimization</h3>
                    <p className="text-gray-600 mb-2">Techniques for optimizing the performance and accuracy of voice recognition.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Security Best Practices</h3>
                    <p className="text-gray-600 mb-2">Guidelines for implementing secure voice interactions in your applications.</p>
                    <a href="#" className="text-soundblue-500 font-medium hover:underline">Read More →</a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Explore By Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="#" className="block p-4 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-soundblue-500">Voice AI Docs</h3>
                  <p className="text-gray-600">Documentation for our core voice recognition and natural language understanding.</p>
                </a>
                <a href="#" className="block p-4 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-soundblue-500">Voice Chat Docs</h3>
                  <p className="text-gray-600">Implementation guides for conversational voice interfaces.</p>
                </a>
                <a href="#" className="block p-4 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-soundblue-500">Voice Search Docs</h3>
                  <p className="text-gray-600">Learn how to integrate voice search capabilities into your applications.</p>
                </a>
                <a href="#" className="block p-4 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-soundblue-500">Houndify Platform Docs</h3>
                  <p className="text-gray-600">Complete documentation for our developer platform and tools.</p>
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Search Documentation</Button>
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Documentation;
