
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const IoTSmartHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">IoT & Smart Home</h1>
            <p className="text-xl text-gray-700 mb-6">
              Connect and control all your smart devices with intuitive voice commands, creating a seamlessly integrated smart home experience.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Smart Home Integration</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Universal Compatibility</strong>
                    <p className="text-gray-600">Works with leading smart home ecosystems and protocols including Zigbee, Z-Wave, and Matter.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Multi-device Orchestration</strong>
                    <p className="text-gray-600">Control multiple devices with a single command, creating sophisticated routines and scenarios.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Privacy-focused</strong>
                    <p className="text-gray-600">On-device processing for sensitive commands with minimal cloud dependency.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Compatible Devices</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Lighting</h3>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Climate Control</h3>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Security Systems</h3>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Entertainment</h3>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Kitchen Appliances</h3>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Smart Speakers</h3>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
              <p className="text-gray-700 mb-2">
                <strong>Morning Routines:</strong> "Good morning" command can open blinds, adjust thermostat, start coffee maker, and brief you on today's schedule.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Home Security:</strong> Voice-controlled security monitoring with ability to check cameras and lock/unlock doors remotely.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Energy Management:</strong> Intelligent control of heating, cooling and lighting to optimize energy usage based on occupancy and preferences.
              </p>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Partner With Us</Button>
              <Button variant="outline">Integration Guide</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default IoTSmartHome;
