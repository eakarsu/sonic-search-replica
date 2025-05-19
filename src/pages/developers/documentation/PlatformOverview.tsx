
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PlatformOverview = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link to="/developers/documentation" className="text-soundblue-500 hover:underline mb-4 inline-block">
                ← Back to Documentation
              </Link>
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Platform Overview</h1>
              <p className="text-xl text-gray-700 mb-6">
                Learn about our voice technology platform and its capabilities.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>ServiqAI Platform Overview</h2>
              <p>
                The ServiqAI platform provides a comprehensive suite of voice AI technologies that enable 
                natural, conversational interactions between humans and devices. Our platform is designed 
                to be flexible, scalable, and easy to integrate into your applications.
              </p>
              
              <h3>Core Components</h3>
              <ul>
                <li>
                  <strong>Automatic Speech Recognition (ASR)</strong> - Convert spoken language into written text with high accuracy across multiple languages and accents.
                </li>
                <li>
                  <strong>Natural Language Understanding (NLU)</strong> - Extract meaning, intent, and context from text, enabling systems to understand user requests.
                </li>
                <li>
                  <strong>Speech Synthesis</strong> - Generate natural-sounding speech from text using a variety of voices and languages.
                </li>
                <li>
                  <strong>Dialogue Management</strong> - Maintain context across conversation turns for natural back-and-forth interactions.
                </li>
              </ul>

              <h3>Key Platform Features</h3>
              <ul>
                <li>
                  <strong>Edge Processing</strong> - Run voice AI directly on devices for improved privacy and reduced latency.
                </li>
                <li>
                  <strong>Custom Domain Support</strong> - Train and optimize models for specific use cases and vocabularies.
                </li>
                <li>
                  <strong>Multi-language Support</strong> - Native support for 25+ languages and regional dialects.
                </li>
                <li>
                  <strong>Enterprise-grade Security</strong> - Secure processing, transmission, and storage of voice data.
                </li>
              </ul>

              <h3>Platform Architecture</h3>
              <p>
                The ServiqAI platform is built on a microservices architecture that enables flexible deployment
                options: cloud-based, on-premises, or hybrid approaches. This architecture provides the scalability
                to handle millions of requests while maintaining low latency.
              </p>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/quick-start">Quick Start Guide →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/account-setup">Account Setup →</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default PlatformOverview;
