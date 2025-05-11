
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const Solutions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <h1 className="text-4xl font-bold mb-8">Our Solutions</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Automotive</h2>
              <p className="text-gray-700 mb-4">
                Voice AI solutions for next-generation vehicles, enhancing driver safety and convenience.
                Our technology enables hands-free control of navigation, entertainment, and vehicle functions.
              </p>
              <a href="/solutions/automotive" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">IoT & Smart Home</h2>
              <p className="text-gray-700 mb-4">
                Connect and control all your smart devices with intuitive voice commands.
                Transform your home with seamless voice integration across all connected devices.
              </p>
              <a href="/solutions/iot-smart-home" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Mobile Apps</h2>
              <p className="text-gray-700 mb-4">
                Enhance mobile experiences with voice technology that makes app interactions more natural and efficient.
                Our SDK makes integration simple for developers.
              </p>
              <a href="/solutions/mobile-apps" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Customer Service</h2>
              <p className="text-gray-700 mb-4">
                Automated support with natural conversations that improve customer satisfaction while reducing costs.
                Our AI-powered voice agents handle common inquiries with human-like understanding.
              </p>
              <a href="/solutions/customer-service" className="text-soundblue-500 font-semibold hover:underline">Learn more →</a>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Solutions;
