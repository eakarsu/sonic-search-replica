
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">About VoiceWave</h1>
            <p className="text-xl text-gray-700 mb-8">
              We're pioneers in voice AI technology, creating more natural ways for people to interact with their devices.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-lg text-gray-700 italic">
                  "To transform human-computer interaction through voice technology that truly understands and responds to natural language, making technology more accessible, intuitive, and helpful for everyone."
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2015, VoiceWave began with a simple but ambitious goal: to create voice technology that could understand and respond to complex, conversational language just as humans do.
              </p>
              <p className="text-gray-700 mb-4">
                Our team of AI researchers, linguists, and engineers developed proprietary deep learning algorithms that revolutionized the way machines understand human speech. Unlike conventional systems that rely on predefined commands, our technology can interpret natural language, follow context across multiple turns of conversation, and deliver meaningful responses.
              </p>
              <p className="text-gray-700 mb-4">
                Today, VoiceWave technology powers millions of voice interactions daily across automotive, smart home, mobile, and enterprise applications, constantly improving through our advanced machine learning systems.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                  <p className="text-gray-600">Chief Executive Officer</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="font-semibold text-lg">Michael Chen</h3>
                  <p className="text-gray-600">Chief Technology Officer</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="font-semibold text-lg">Priya Patel</h3>
                  <p className="text-gray-600">Chief Product Officer</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="font-semibold text-lg">David Rodriguez</h3>
                  <p className="text-gray-600">Chief Revenue Officer</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                  <p className="text-gray-600">Continuously pushing boundaries to create technology that transforms experiences.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
                  <p className="text-gray-600">Making technology more accessible to everyone through natural voice interactions.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Privacy</h3>
                  <p className="text-gray-600">Respecting user data with robust privacy protections and transparent practices.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Join Our Team</Button>
              <Button variant="outline">Contact Us</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default AboutUs;
