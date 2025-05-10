
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CoreConcepts = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Core Concepts</h1>
              <p className="text-xl text-gray-700 mb-6">
                Understand the fundamental concepts and architecture of our voice technology.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Core Concepts of ServiqAI</h2>
              <p>
                This guide explains the key concepts behind our voice AI technology and how the different 
                components work together to create natural voice interactions.
              </p>
              
              <h3>The Voice Interaction Pipeline</h3>
              <p>
                Voice interactions typically follow a pipeline with several key stages:
              </p>
              
              <h4>1. Speech Recognition (ASR)</h4>
              <p>
                Automatic Speech Recognition converts audio input into text. Our ASR system uses advanced 
                deep learning models to recognize speech across different languages, accents, and acoustic environments.
              </p>
              <p>
                Key features:
              </p>
              <ul>
                <li>Support for 25+ languages and regional dialects</li>
                <li>Noise resilience for reliable recognition in challenging environments</li>
                <li>Speaker adaptation that improves accuracy over time</li>
                <li>Domain-specific models for specialized vocabularies</li>
              </ul>

              <h4>2. Natural Language Understanding (NLU)</h4>
              <p>
                NLU processes the recognized text to extract meaning, intent, and entities. This is where 
                the system determines what the user wants to do and identifies important pieces of information.
              </p>
              <p>
                Components of NLU:
              </p>
              <ul>
                <li>Intent detection - Understanding the user's goal</li>
                <li>Entity extraction - Identifying key pieces of information</li>
                <li>Contextual analysis - Understanding references based on previous interactions</li>
                <li>Sentiment analysis - Detecting the user's emotional state</li>
              </ul>

              <h4>3. Dialogue Management</h4>
              <p>
                The dialogue manager maintains the state of the conversation, decides how to respond to the 
                user's input, and keeps track of context across multiple turns of conversation.
              </p>
              <p>
                Key capabilities:
              </p>
              <ul>
                <li>Context maintenance across conversation turns</li>
                <li>User preference tracking</li>
                <li>Multi-step task completion</li>
                <li>Error recovery and clarification strategies</li>
              </ul>

              <h4>4. Response Generation</h4>
              <p>
                Based on the understood request and the current dialogue state, the system generates an 
                appropriate response. This might involve retrieving information, taking an action, or generating 
                natural language.
              </p>

              <h4>5. Speech Synthesis (TTS)</h4>
              <p>
                Text-to-Speech converts the system's response into spoken audio. Our TTS technology produces 
                natural-sounding speech with appropriate prosody and intonation.
              </p>
              <p>
                Features:
              </p>
              <ul>
                <li>Multiple voice options across genders and languages</li>
                <li>Emotional expressivity</li>
                <li>Custom voice creation for brand identity</li>
                <li>SSML support for fine-grained control over speech output</li>
              </ul>

              <h3>Edge vs. Cloud Processing</h3>
              <p>
                ServiqAI offers both edge and cloud-based processing options:
              </p>
              <ul>
                <li><strong>Edge processing</strong> - Runs on the device for better privacy and lower latency, but with some limitations in capabilities</li>
                <li><strong>Cloud processing</strong> - Provides the highest accuracy and most advanced features, but requires internet connectivity</li>
                <li><strong>Hybrid approaches</strong> - Optimally combine edge and cloud capabilities based on connection status and request complexity</li>
              </ul>

              <h3>Domains and Skills</h3>
              <p>
                ServiqAI organizes capabilities into domains (knowledge areas) and skills (specific abilities):
              </p>
              <ul>
                <li><strong>Domains</strong> - Subject areas like music, weather, navigation, etc.</li>
                <li><strong>Skills</strong> - Specific functions within domains, like playing a song or providing a forecast</li>
                <li><strong>Custom domains</strong> - Create specialized knowledge areas for your application</li>
              </ul>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/rest-api-reference">REST API Reference →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/ios-sdk">iOS SDK →</Link>
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

export default CoreConcepts;
