
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";

const Partners = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Our Partners</h1>
            <p className="text-xl text-gray-700 mb-8">
              We work with leading companies and organizations to bring voice AI technology to various industries.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Strategic Alliances</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {/* Partner logos - placeholder divs for demonstration */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div 
                    key={i} 
                    className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center h-32"
                  >
                    <div className="text-gray-400 font-semibold">Partner Logo {i}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Partner Success Stories</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-gray-400">Logo</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Automotive Leader</h3>
                      <p className="text-gray-600">Global Automotive Manufacturer</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Implementing VoiceWave's AI technology has transformed our in-car experience. Driver satisfaction has increased by 35%, and our voice command accuracy is now at an industry-leading 98%."
                  </p>
                  <Button variant="outline">Read Case Study</Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-gray-400">Logo</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Smart Home Innovator</h3>
                      <p className="text-gray-600">IoT Solutions Provider</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "VoiceWave's SDK allowed us to integrate advanced voice commands into our smart home ecosystem in just weeks, not months. Our customers love the natural conversation flow and accuracy."
                  </p>
                  <Button variant="outline">Read Case Study</Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-gray-400">Logo</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Healthcare Solutions</h3>
                      <p className="text-gray-600">Medical Technology Company</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "The accuracy and security of VoiceWave's platform has been crucial for our medical applications. Their technology has helped us create hands-free solutions that improve efficiency and patient care."
                  </p>
                  <Button variant="outline">Read Case Study</Button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-soundblue-500 to-soundblue-700 text-white p-8 rounded-lg mb-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="text-2xl font-semibold mb-2">Become a Partner</h2>
                  <p>Join our ecosystem of innovative companies leveraging voice AI technology.</p>
                </div>
                <div className="flex items-center">
                  <Handshake className="mr-2" size={24} />
                  <Button variant="secondary">Partner With Us</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Partners;
