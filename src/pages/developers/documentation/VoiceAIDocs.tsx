
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DocSection from "@/components/documentation/DocSection";
import CodeBlock from "@/components/documentation/CodeBlock";
import { Mic } from "lucide-react";

const VoiceAIDocs = () => {
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
              <div className="flex items-center gap-3 mb-4">
                <Mic className="h-8 w-8 text-soundblue-500" />
                <h1 className="text-4xl font-bold text-soundblue-500">Voice AI Documentation</h1>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Comprehensive guide to integrating our advanced voice recognition technology into your applications.
              </p>
            </div>

            <DocSection title="Getting Started with Voice AI">
              <p className="mb-4">
                Our Voice AI technology provides state-of-the-art speech recognition and natural language understanding 
                capabilities that can be integrated into any application. This documentation will guide you through the 
                process of setting up and implementing Voice AI in your projects.
              </p>
              <p className="mb-4">
                Before you begin, make sure you have an API key. If you don't have one yet, you can 
                <Link to="/developers/documentation/account-setup" className="text-soundblue-500 hover:underline"> set up an account </Link> 
                to get started.
              </p>
            </DocSection>

            <DocSection title="Key Features">
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>High-accuracy voice recognition in 25+ languages</li>
                <li>Natural language understanding with contextual awareness</li>
                <li>Edge processing capabilities for improved privacy and reduced latency</li>
                <li>Noise resilience for accurate recognition in challenging environments</li>
                <li>Customizable models for domain-specific vocabulary</li>
              </ul>
            </DocSection>

            <DocSection title="Basic Integration">
              <p className="mb-4">
                Here's a simple example of integrating Voice AI recognition in a web application:
              </p>
              <CodeBlock language="javascript">
{`// Initialize the Voice AI client
const voiceAI = new ServiqAI.VoiceRecognition({
  apiKey: 'YOUR_API_KEY',
  language: 'en-US',
});

// Start listening for speech
const startListening = () => {
  voiceAI.listen({
    onResult: (result) => {
      console.log('Recognized text:', result.text);
      
      // Handle the recognized text in your application
      document.getElementById('output').textContent = result.text;
    },
    onError: (error) => {
      console.error('Recognition error:', error);
    }
  });
};

// Stop listening
const stopListening = () => {
  voiceAI.stop();
};`}
              </CodeBlock>
            </DocSection>

            <DocSection title="Advanced Configuration">
              <p className="mb-4">
                Voice AI can be configured with various options to suit your specific needs:
              </p>
              <CodeBlock language="javascript">
{`const voiceAI = new ServiqAI.VoiceRecognition({
  apiKey: 'YOUR_API_KEY',
  language: 'en-US',
  continuous: true,       // For continuous recognition
  interimResults: true,   // Get results as user speaks
  maxAlternatives: 3,     // Number of alternative results
  timeout: 10000,         // Recognition timeout in ms
  customVocabulary: [     // Domain-specific terms
    'ServiqAI',
    'voice recognition',
    'machine learning'
  ]
});`}
              </CodeBlock>
            </DocSection>

            <div className="mt-12 flex justify-center gap-4">
              <Button asChild className="gradient-primary">
                <Link to="/developers/documentation/rest-api-reference">API Reference</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/developers/documentation/ios-sdk">iOS SDK</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/developers/documentation/android-sdk">Android SDK</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default VoiceAIDocs;
