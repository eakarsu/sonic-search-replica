
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactRound, Building2, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Contact Us</h1>
            <p className="text-xl text-gray-700 mb-8">
              Have questions? We're here to help. Reach out to our team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
                <div className="mb-4 text-soundblue-500">
                  <ContactRound size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Sales Inquiries</h3>
                <p className="text-gray-600 mb-2">Interested in our products?</p>
                <p className="text-soundblue-600">sales@voicewave.com</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
                <div className="mb-4 text-soundblue-500">
                  <Building2 size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Headquarters</h3>
                <p className="text-gray-600 mb-2">123 Tech Park Avenue</p>
                <p className="text-gray-600">San Francisco, CA 94105</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
                <div className="mb-4 text-soundblue-500">
                  <Mail size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Support</h3>
                <p className="text-gray-600 mb-2">Need technical help?</p>
                <p className="text-soundblue-600">support@voicewave.com</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                  <Input id="subject" placeholder="Subject of your message" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                  <Textarea id="message" placeholder="How can we help you?" rows={6} />
                </div>
                
                <Button className="w-full md:w-auto">Submit Message</Button>
              </form>
            </div>
            
            <div className="rounded-lg overflow-hidden h-96 mb-12">
              {/* Placeholder for a map - in a real application, you would integrate a map service here */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Contact;
