
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerService = () => {
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
              <MessageSquare className="h-8 w-8 text-soundblue-500" />
              <h1 className="text-4xl font-bold text-soundblue-500">Customer Service</h1>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Transform your customer service experience with AI-powered voice solutions that understand,
              respond, and resolve customer inquiries naturally and efficiently.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Reduced Wait Times</strong>
                    <p className="text-gray-600">Handle multiple customer inquiries simultaneously, decreasing wait times by up to 80%.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">24/7 Support</strong>
                    <p className="text-gray-600">Provide round-the-clock customer service without the cost of staffing additional shifts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Human-Like Understanding</strong>
                    <p className="text-gray-600">Natural language processing that understands context, sentiment, and customer intent.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Seamless Escalation</strong>
                    <p className="text-gray-600">Intelligent routing to human agents when needed, with complete context preservation.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Implementation Options</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Voice IVR System</h3>
                  <p className="text-gray-600 mb-4">Replace traditional menu-based IVR systems with conversational voice interactions that understand natural language queries.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Voice Chatbots</h3>
                  <p className="text-gray-600 mb-4">Deploy AI-powered voice chatbots on your website or mobile app to handle common customer inquiries.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Agent Assistance</h3>
                  <p className="text-gray-600 mb-4">Augment human agents with real-time AI suggestions and automated information retrieval.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Omnichannel Support</h3>
                  <p className="text-gray-600 mb-4">Provide consistent voice-enabled support across phone, web, mobile, and messaging platforms.</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Results Our Clients Have Seen</h2>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-4xl font-bold text-soundblue-500 mb-2">65%</div>
                  <p className="text-gray-700">Reduction in average handle time</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-soundblue-500 mb-2">40%</div>
                  <p className="text-gray-700">Decrease in support costs</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-soundblue-500 mb-2">92%</div>
                  <p className="text-gray-700">Customer satisfaction rate</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Schedule a Demo</Button>
              <Button variant="outline" asChild>
                <Link to="/developers/documentation/voice-chat-docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default CustomerService;
