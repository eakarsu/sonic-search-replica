
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AccountSetup = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Account Setup</h1>
              <p className="text-xl text-gray-700 mb-6">
                Create an account, generate API keys, and set up your developer environment.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Setting Up Your ServiqAI Account</h2>
              <p>
                This guide will walk you through the process of setting up your ServiqAI developer account, 
                generating API keys, and configuring your development environment.
              </p>
              
              <h3>1. Create a Developer Account</h3>
              <ol>
                <li>Visit <Link to="/get-started" className="text-soundblue-500 hover:underline">the ServiqAI developer portal</Link></li>
                <li>Click on "Sign Up" and enter your email address and password</li>
                <li>Verify your email address by clicking the link sent to your inbox</li>
                <li>Complete your profile information</li>
              </ol>

              <h3>2. Generate API Keys</h3>
              <p>To use the ServiqAI platform, you'll need to generate API keys:</p>
              <ol>
                <li>Log in to the developer portal</li>
                <li>Navigate to "API Keys" in the dashboard</li>
                <li>Click "Create New API Key"</li>
                <li>Name your key (e.g., "Development", "Production")</li>
                <li>Select the services you want to access</li>
                <li>Click "Generate Key"</li>
                <li>Copy and securely store your API key - it will only be shown once!</li>
              </ol>

              <h3>3. Set Up Your Development Environment</h3>
              <p>Prepare your development environment based on your platform:</p>
              
              <h4>Web Development</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  npm install serviqai-voice-sdk
                  
                  // or with yarn
                  yarn add serviqai-voice-sdk
                </code>
              </pre>

              <h4>iOS Development</h4>
              <p>Add the following to your Podfile:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  pod 'ServiqAIVoiceSDK'
                  
                  // Then run
                  pod install
                </code>
              </pre>

              <h4>Android Development</h4>
              <p>Add the following to your build.gradle:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  implementation 'com.serviqai:voice-sdk:1.0.0'
                </code>
              </pre>

              <h3>4. Configure Environment Variables</h3>
              <p>
                For secure API key management, we recommend using environment variables:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // .env file (do not commit to version control)
                  SERVIQAI_API_KEY=your_api_key_here
                </code>
              </pre>

              <h3>5. Test Your Setup</h3>
              <p>
                Verify your setup with a simple API call:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  import ServiqAI from 'serviqai-voice-sdk';
                  
                  ServiqAI.initialize({
                    apiKey: process.env.SERVIQAI_API_KEY
                  });
                  
                  ServiqAI.testConnection()
                    .then(response => {
                      console.log('Connection successful!', response);
                    })
                    .catch(error => {
                      console.error('Connection failed:', error);
                    });
                </code>
              </pre>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/core-concepts">Core Concepts →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/rest-api-reference">REST API Reference →</Link>
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

export default AccountSetup;
