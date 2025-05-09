
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Developers = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <h1 className="text-4xl font-bold mb-8">Developer Resources</h1>
          
          <div className="bg-gradient-to-r from-soundblue-500 to-soundpurple-500 text-white p-8 rounded-lg mb-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">Build the future of voice interactions</h2>
              <p className="text-xl mb-6">
                Access powerful tools, comprehensive documentation, and supportive community to create 
                amazing voice-enabled experiences.
              </p>
              <Button size="lg" className="bg-white text-soundblue-500 hover:bg-gray-100">
                Get API Key
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Documentation</h2>
              <p className="text-gray-700 mb-4">
                Comprehensive guides and API references to help you integrate and optimize our voice technology.
                From quick starts to advanced tutorials, we've got you covered.
              </p>
              <a href="#documentation" className="text-soundblue-500 font-semibold hover:underline">View Docs →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">SDKs</h2>
              <p className="text-gray-700 mb-4">
                Development kits for multiple platforms including iOS, Android, Web, and more.
                Our SDKs make integration straightforward with sample code and tutorials.
              </p>
              <a href="#sdks" className="text-soundblue-500 font-semibold hover:underline">Download SDKs →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">API Access</h2>
              <p className="text-gray-700 mb-4">
                Integrate our technology into your applications with our powerful REST APIs.
                Scalable solutions for projects of any size, from startups to enterprise.
              </p>
              <a href="#api-access" className="text-soundblue-500 font-semibold hover:underline">API Reference →</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-soundblue-500">Community</h2>
              <p className="text-gray-700 mb-4">
                Join our developer community and forums to share knowledge, get support,
                and connect with other developers building with our technology.
              </p>
              <a href="#community" className="text-soundblue-500 font-semibold hover:underline">Join Community →</a>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Developers;
