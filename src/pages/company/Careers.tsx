
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Building, Users, Award, Handshake } from "lucide-react";

const Careers = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Join Our Team</h1>
            <p className="text-xl text-gray-700 mb-8">
              Help us transform how people interact with technology through advanced voice AI solutions.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Why VoiceWave?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg flex">
                  <div className="mr-4 text-soundblue-500">
                    <Building size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Innovative Environment</h3>
                    <p className="text-gray-600">Work on cutting-edge voice technology that is changing how people interact with their devices.</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg flex">
                  <div className="mr-4 text-soundblue-500">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Collaborative Culture</h3>
                    <p className="text-gray-600">Join a diverse team of experts committed to excellence and innovation in AI.</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg flex">
                  <div className="mr-4 text-soundblue-500">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Growth Opportunities</h3>
                    <p className="text-gray-600">Develop your skills and advance your career in a rapidly growing field.</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg flex">
                  <div className="mr-4 text-soundblue-500">
                    <Handshake size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Competitive Benefits</h3>
                    <p className="text-gray-600">Enjoy comprehensive health coverage, flexible work arrangements, and more.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Senior Machine Learning Engineer</h3>
                  <p className="text-gray-600 mb-3">Design and implement advanced machine learning models for our voice recognition platform.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-soundblue-100 text-soundblue-600 text-sm px-3 py-1 rounded-full">Full-time</span>
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">Remote</span>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Voice UX Designer</h3>
                  <p className="text-gray-600 mb-3">Create intuitive and engaging voice interfaces for our AI products.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-soundblue-100 text-soundblue-600 text-sm px-3 py-1 rounded-full">Full-time</span>
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">San Francisco, CA</span>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Natural Language Processing Specialist</h3>
                  <p className="text-gray-600 mb-3">Develop and improve our NLP algorithms for better language understanding.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-soundblue-100 text-soundblue-600 text-sm px-3 py-1 rounded-full">Full-time</span>
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">Boston, MA</span>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-soundblue-500 to-soundblue-700 text-white p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-semibold mb-4">Don't see the right position?</h2>
              <p className="mb-6">We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future openings.</p>
              <Button variant="secondary">Submit Your Resume</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Careers;
