
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const Products = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <h1 className="text-4xl font-bold mb-8">Our Products</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Voice AI</h2>
              <p className="text-gray-700 mb-4">
                Advanced voice recognition and assistant technology that transforms how users interact with devices.
                Our Voice AI understands natural language with incredible accuracy.
              </p>
              <a href="#voice-ai" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Voice Chat</h2>
              <p className="text-gray-700 mb-4">
                Conversational voice interfaces for your applications that provide natural, human-like interactions.
                Enhance user experience with our powerful Voice Chat solutions.
              </p>
              <a href="#voice-chat" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Voice Search</h2>
              <p className="text-gray-700 mb-4">
                Intelligent search powered by voice commands, allowing users to find information quickly and
                effectively using natural language queries.
              </p>
              <a href="#voice-search" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Houndify</h2>
              <p className="text-gray-700 mb-4">
                A comprehensive voice AI platform for developers that offers powerful tools and APIs to
                integrate advanced voice capabilities into any application or device.
              </p>
              <a href="#houndify" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Products;
