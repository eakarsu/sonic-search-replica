
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const News = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Latest News</h1>
            <p className="text-xl text-gray-700 mb-8">
              Stay updated with the latest developments, press releases, and news from VoiceWave.
            </p>

            <div className="mb-12 space-y-8">
              <article className="border-b border-gray-200 pb-8">
                <p className="text-sm text-gray-500 mb-2">May 2, 2025</p>
                <h2 className="text-2xl font-semibold mb-3">VoiceWave Announces New Partnership with Leading Automotive Manufacturer</h2>
                <p className="text-gray-700 mb-4">
                  VoiceWave today announced a strategic partnership with one of the world's largest automotive manufacturers to integrate our advanced voice AI technology into their upcoming vehicle lineup.
                </p>
                <Button variant="outline">Read More</Button>
              </article>
              
              <article className="border-b border-gray-200 pb-8">
                <p className="text-sm text-gray-500 mb-2">April 15, 2025</p>
                <h2 className="text-2xl font-semibold mb-3">VoiceWave's Voice AI Platform Achieves Industry-Leading Accuracy Rating</h2>
                <p className="text-gray-700 mb-4">
                  In a recent independent benchmark test, our voice recognition technology achieved a 98.7% accuracy rate, setting a new standard for voice AI in the industry.
                </p>
                <Button variant="outline">Read More</Button>
              </article>
              
              <article className="border-b border-gray-200 pb-8">
                <p className="text-sm text-gray-500 mb-2">March 21, 2025</p>
                <h2 className="text-2xl font-semibold mb-3">VoiceWave Expands Global Presence with New Office in Singapore</h2>
                <p className="text-gray-700 mb-4">
                  As part of our commitment to serving customers worldwide, VoiceWave has opened a new regional headquarters in Singapore to better support clients across the Asia-Pacific region.
                </p>
                <Button variant="outline">Read More</Button>
              </article>
              
              <article className="border-b border-gray-200 pb-8">
                <p className="text-sm text-gray-500 mb-2">February 8, 2025</p>
                <h2 className="text-2xl font-semibold mb-3">VoiceWave Releases New Developer Tools for Voice-Enabled Applications</h2>
                <p className="text-gray-700 mb-4">
                  Our new suite of developer tools makes it easier than ever to integrate powerful voice commands and conversational AI into mobile and web applications.
                </p>
                <Button variant="outline">Read More</Button>
              </article>
            </div>

            <div className="flex justify-center">
              <Button>Load More News</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default News;
