
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VoiceAI = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Voice AI</h1>
            <p className="text-xl text-gray-700 mb-6">
              Advanced voice recognition and assistant technology that transforms how users interact with devices.
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
                    <strong className="font-medium">Natural Language Understanding</strong>
                    <p className="text-gray-600">Process and understand natural language with incredible accuracy, including complex queries and contextual conversations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Multi-language Support</strong>
                    <p className="text-gray-600">Support for over 25 languages and different accents, enabling global accessibility.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Edge Processing</strong>
                    <p className="text-gray-600">Process voice commands locally on devices for enhanced privacy and reduced latency.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <p className="text-gray-700 mb-4">
                Our Voice AI technology uses advanced neural networks to process and understand human speech. The system can distinguish between different speakers, understand complex questions, and maintain context throughout conversations.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike conventional voice assistants, our technology can handle complex, conversational interactions without requiring specific command structures or keywords.
              </p>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4" asChild>
                <Link to="/company/contact">Request a Demo</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/developers/documentation">Documentation</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default VoiceAI;
