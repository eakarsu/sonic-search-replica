
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About VoiceWave</h1>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Our Mission</h2>
              <p className="text-gray-700 mb-4 text-lg">
                At VoiceWave, we're on a mission to transform how humans interact with technology through the power of voice. 
                We believe voice is the most natural interface for technology, and we're dedicated to making voice AI 
                accessible, accurate, and effective for everyone.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Our Story</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Founded in 2020, VoiceWave began with a simple idea: voice technology should understand humans, not the other way around. 
                Our team of AI researchers, linguists, and engineers has worked tirelessly to create voice recognition 
                technology that understands natural language with unprecedented accuracy and speed.
              </p>
              <p className="text-gray-700 mb-8 text-lg">
                Today, our technology powers millions of voice interactions across automotive, smart home, mobile applications, 
                and customer service solutions worldwide.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Leadership</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {["CEO & Founder", "CTO", "COO"].map((title, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4"></div>
                    <h3 className="font-bold">Jane Doe</h3>
                    <p className="text-gray-600">{title}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Contact Us</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Have questions or want to learn more about our technology and solutions? We'd love to hear from you.
              </p>
              <div className="bg-gray-100 p-6 rounded-lg mt-4">
                <p className="mb-2"><strong>Email:</strong> info@voicewave.ai</p>
                <p className="mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Headquarters:</strong> 123 Voice Lane, San Francisco, CA 94103</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default About;
