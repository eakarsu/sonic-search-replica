
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Support = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-8 w-8 text-soundblue-500" />
              <h1 className="text-4xl font-bold text-soundblue-500">Developer Support</h1>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Get the help you need to successfully implement our voice technology in your applications.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Support Options</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Documentation</h3>
                    <p className="text-gray-700 mb-3">
                      Comprehensive guides, tutorials, and API references to help you with integration.
                    </p>
                    <Link to="/developers/documentation" className="text-soundblue-500 hover:underline">Browse Documentation →</Link>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Community Forums</h3>
                    <p className="text-gray-700 mb-3">
                      Connect with other developers and get help from the community.
                    </p>
                    <Link to="/developers/community" className="text-soundblue-500 hover:underline">Visit Forums →</Link>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Email Support</h3>
                    <p className="text-gray-700 mb-3">
                      Submit a ticket to our support team for technical assistance.
                    </p>
                    <Button variant="outline" size="sm">Contact Support</Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Premium Support</h3>
                    <p className="text-gray-700 mb-3">
                      Enterprise-grade support with dedicated account management and priority response.
                    </p>
                    <Button variant="outline" size="sm">Learn About Premium Support</Button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Topic</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500">
                      <option>API Integration</option>
                      <option>SDK Implementation</option>
                      <option>Account & Billing</option>
                      <option>Technical Issue</option>
                      <option>Feature Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500" 
                      rows={5}
                      placeholder="Please describe your issue in detail"
                    ></textarea>
                  </div>
                  <Button className="gradient-primary w-full">Submit Support Request</Button>
                </form>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I get an API key?</AccordionTrigger>
                  <AccordionContent>
                    You can obtain an API key by signing up for a developer account on our platform. After creating your account, navigate to the Developer Dashboard and generate a new API key for your project.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the usage limits for the free tier?</AccordionTrigger>
                  <AccordionContent>
                    The free tier includes 1,000 API calls per month, with a maximum of 100 calls per day. Each API call can process up to 15 seconds of audio for speech recognition or 500 characters for text-to-speech conversion.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Which languages are supported by the voice recognition API?</AccordionTrigger>
                  <AccordionContent>
                    Our voice recognition API currently supports 25+ languages, including English (various accents), Spanish, French, German, Japanese, Mandarin Chinese, Korean, Italian, Portuguese, and many more. Check our language support documentation for the full list and support levels.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How can I improve recognition accuracy?</AccordionTrigger>
                  <AccordionContent>
                    To improve recognition accuracy, ensure you're using a high-quality audio input with minimal background noise. You can also create custom language models for domain-specific terminology, adjust sensitivity settings, and implement feedback loops to continuously train the system.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Are there any client libraries available?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we provide official client libraries for several programming languages including JavaScript, Python, Java, Swift (iOS), and Kotlin (Android). These libraries simplify the integration process and handle authentication, request formatting, and error handling.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="bg-soundblue-50 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-semibold mb-4">Support Hours & Response Times</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Standard Support</h3>
                  <p className="text-gray-700 mb-2"><strong>Hours:</strong> Monday - Friday, 9am - 5pm PST</p>
                  <p className="text-gray-700 mb-2"><strong>Email Response:</strong> Within 24 business hours</p>
                  <p className="text-gray-700"><strong>Forum Responses:</strong> Monitored during business hours</p>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Premium Support</h3>
                  <p className="text-gray-700 mb-2"><strong>Hours:</strong> 24/7 for critical issues</p>
                  <p className="text-gray-700 mb-2"><strong>Email Response:</strong> Within 4 hours</p>
                  <p className="text-gray-700"><strong>Phone Support:</strong> Available for enterprise customers</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold mb-4">Can't Find What You Need?</h2>
              <p className="text-gray-700 mb-6 max-w-2xl">
                Our support team is here to help with any questions or issues you may have with our platform.
                We're committed to helping you succeed with your voice AI implementation.
              </p>
              <div className="flex gap-4">
                <Button className="gradient-primary">Contact Support</Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/community">Join Developer Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Support;
