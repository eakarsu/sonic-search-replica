
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Api } from "lucide-react";
import { Link } from "react-router-dom";
import CodeBlock from "@/components/documentation/CodeBlock";

const ApiAccess = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Api className="h-8 w-8 text-soundblue-500" />
              <h1 className="text-4xl font-bold text-soundblue-500">API Access</h1>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Integrate our powerful voice technology directly into your applications with our comprehensive REST APIs.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">1. Sign Up for an API Key</h3>
                  <p className="text-gray-600 mb-4">Create a developer account and generate API keys for authentication.</p>
                  <Button className="gradient-primary">Get API Key</Button>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">2. Explore Available Endpoints</h3>
                  <p className="text-gray-600 mb-4">Our API provides endpoints for speech recognition, natural language understanding, and text-to-speech conversion.</p>
                  <Link to="/developers/documentation/rest-api-reference" className="text-soundblue-500 font-medium hover:underline">View API Reference →</Link>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">3. Test Your Integration</h3>
                  <p className="text-gray-600 mb-4">Use our testing tools to validate your API integration before going to production.</p>
                  <Button variant="outline">Open API Console</Button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Sample API Request</h2>
              <CodeBlock language="bash">
{`# Speech recognition request
curl -X POST https://api.serviqai.com/v1/speech/recognize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: audio/wav" \\
  --data-binary @audio_sample.wav`}
              </CodeBlock>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Sample Response</h3>
                <CodeBlock language="json">
{`{
  "results": [
    {
      "transcript": "What's the weather like in San Francisco today?",
      "confidence": 0.98,
      "alternatives": [
        {
          "transcript": "What is the weather like in San Francisco today?",
          "confidence": 0.92
        }
      ]
    }
  ],
  "status": "success"
}`}
                </CodeBlock>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">API Features</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">RESTful interface with JSON responses</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">WebSocket support for real-time processing</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">OAuth 2.0 authentication</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">Rate limiting with generous free tier</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">Comprehensive error handling</span>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">API Use Cases</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">Voice-enabled applications and websites</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">Conversational interfaces and chatbots</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">Voice search implementation</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">Audio transcription services</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">IoT device integration</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-700 mb-6 max-w-2xl">
                Explore our comprehensive documentation to learn more about our API capabilities and how to integrate them into your applications.
              </p>
              <div className="flex gap-4">
                <Button className="gradient-primary" asChild>
                  <Link to="/developers/documentation/rest-api-reference">API Documentation</Link>
                </Button>
                <Button variant="outline">Register for API Key</Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default ApiAccess;
