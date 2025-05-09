
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const VoiceChat = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Voice Chat</h1>
            <p className="text-xl text-gray-700 mb-6">
              Conversational voice interfaces for your applications that provide natural, human-like interactions.
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
                    <strong className="font-medium">Conversational AI</strong>
                    <p className="text-gray-600">Enable natural back-and-forth conversations with context awareness across multiple turns.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Customizable Voices</strong>
                    <p className="text-gray-600">Select from a variety of natural-sounding voices to match your brand identity.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Easy Integration</strong>
                    <p className="text-gray-600">Simple APIs and SDKs that make adding voice chat functionality to any application straightforward.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
              <p className="text-gray-700 mb-4">
                <strong>Customer Support:</strong> Implement voice chatbots for customer service that can handle common inquiries and escalate complex issues.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>In-app Assistants:</strong> Add voice interfaces to your mobile or web applications to improve accessibility and user experience.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Interactive Voice Response:</strong> Create sophisticated IVR systems that understand natural language rather than requiring menu navigation.
              </p>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Start Free Trial</Button>
              <Button variant="outline">View Pricing</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default VoiceChat;
