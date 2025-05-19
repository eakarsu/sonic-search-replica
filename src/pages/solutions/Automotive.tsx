
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Automotive = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Automotive Solutions</h1>
            <p className="text-xl text-gray-700 mb-6">
              Voice AI solutions for next-generation vehicles, enhancing driver safety and convenience through hands-free control.
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
                    <strong className="font-medium">Enhanced Safety</strong>
                    <p className="text-gray-600">Allows drivers to keep their hands on the wheel and eyes on the road while controlling vehicle functions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Offline Operation</strong>
                    <p className="text-gray-600">Works without internet connectivity, ensuring reliability in all driving conditions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Seamless Integration</strong>
                    <p className="text-gray-600">Compatible with major automotive infotainment systems and easily customizable for brand-specific experiences.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Climate Control</h3>
                  <p className="text-gray-600">Adjust temperature, fan speed, and other climate settings through voice commands.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Navigation</h3>
                  <p className="text-gray-600">Find destinations, route planning, and traffic information using natural language.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Entertainment</h3>
                  <p className="text-gray-600">Control music, podcasts, and other audio content without taking your eyes off the road.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Vehicle Diagnostics</h3>
                  <p className="text-gray-600">Check fuel levels, tire pressure, and receive maintenance alerts through voice queries.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Request Demo</Button>
              <Button variant="outline">Contact Sales</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Automotive;
