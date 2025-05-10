
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuickStart = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Quick Start Guide</h1>
              <p className="text-xl text-gray-700 mb-6">
                Get up and running with your first voice-enabled application in minutes.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Quick Start Guide</h2>
              <p>
                This guide will help you quickly integrate ServiqAI's voice technology into your application. 
                Follow these steps to create a simple voice-enabled feature.
              </p>
              
              <h3>1. Create an Account</h3>
              <p>
                Before you begin, you'll need a ServiqAI developer account. If you don't have one already, 
                <Link to="/get-started" className="text-soundblue-500 hover:underline"> sign up here</Link>.
              </p>

              <h3>2. Install the SDK</h3>
              <p>Choose the SDK for your platform:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {/* Web SDK */}
                  npm install serviqai-voice-sdk
                  
                  {/* iOS */}
                  pod 'ServiqAIVoiceSDK'
                  
                  {/* Android */}
                  implementation 'com.serviqai:voice-sdk:1.0.0'
                </code>
              </pre>

              <h3>3. Initialize the SDK</h3>
              <p>Initialize the SDK with your API key:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {/* JavaScript */}
                  import ServiqAI from 'serviqai-voice-sdk';
                  
                  ServiqAI.initialize({
                    apiKey: 'YOUR_API_KEY',
                    language: 'en-US'
                  });
                </code>
              </pre>

              <h3>4. Create a Simple Voice Command</h3>
              <p>Add a voice command to your application:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {/* JavaScript */}
                  const voiceButton = document.getElementById('voice-button');
                  
                  voiceButton.addEventListener('click', () => {
                    ServiqAI.startListening({
                      onResult: (result) => {
                        console.log('User said:', result.text);
                        
                        if (result.text.includes('hello')) {
                          ServiqAI.speak('Hello! How can I help you today?');
                        }
                      },
                      onError: (error) => {
                        console.error('Error:', error);
                      }
                    });
                  });
                </code>
              </pre>

              <h3>5. Test Your Integration</h3>
              <p>
                Run your application and test the voice feature. Click the voice button and say "Hello" to hear 
                the response.
              </p>

              <h3>Next Steps</h3>
              <p>
                This is just a basic example. Explore our documentation to learn more about advanced features like:
              </p>
              <ul>
                <li>Continuous conversation</li>
                <li>Custom domain models</li>
                <li>Multi-language support</li>
                <li>Voice UI best practices</li>
              </ul>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/account-setup">Account Setup →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/core-concepts">Core Concepts →</Link>
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

export default QuickStart;
