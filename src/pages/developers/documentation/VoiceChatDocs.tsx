
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DocSection from "@/components/documentation/DocSection";
import CodeBlock from "@/components/documentation/CodeBlock";
import { MessageSquare } from "lucide-react";

const VoiceChatDocs = () => {
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
                <MessageSquare className="h-8 w-8 text-soundblue-500" />
                <h1 className="text-4xl font-bold text-soundblue-500">Voice Chat Documentation</h1>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Implement conversational voice interfaces that provide natural, human-like interactions in your applications.
              </p>
            </div>

            <DocSection title="Voice Chat Overview">
              <p className="mb-4">
                Voice Chat technology allows your applications to engage in natural, back-and-forth conversations with users. 
                Our system maintains context across multiple turns, understands natural language queries, and responds 
                with human-like voice interactions.
              </p>
              <p className="mb-4">
                This documentation will guide you through the process of implementing Voice Chat in your applications 
                using our SDKs and APIs.
              </p>
            </DocSection>

            <DocSection title="Key Components">
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Automatic Speech Recognition (ASR):</strong> Converts spoken language to text</li>
                <li><strong>Natural Language Understanding (NLU):</strong> Interprets the meaning behind user queries</li>
                <li><strong>Dialogue Management:</strong> Maintains conversation context and handles multi-turn interactions</li>
                <li><strong>Text-to-Speech (TTS):</strong> Converts text responses to natural-sounding speech</li>
              </ul>
            </DocSection>

            <DocSection title="Basic Integration">
              <p className="mb-4">
                Here's how to implement a simple voice chat interface in your web application:
              </p>
              <CodeBlock language="javascript">
{`// Initialize the Voice Chat client
const voiceChat = new ServiqAI.VoiceChat({
  apiKey: 'YOUR_API_KEY',
  voice: 'sarah', // Choose from available voices
  language: 'en-US'
});

// Start a conversation
const startConversation = () => {
  voiceChat.start({
    onSpeechStart: () => {
      console.log('User started speaking');
      // Update UI to show listening state
      document.getElementById('status').textContent = 'Listening...';
    },
    onSpeechEnd: () => {
      console.log('User finished speaking');
      document.getElementById('status').textContent = 'Processing...';
    },
    onResult: (result) => {
      // Handle the user's speech and the assistant's response
      console.log('User said:', result.userText);
      console.log('Assistant response:', result.assistantText);
      
      document.getElementById('userSpeech').textContent = result.userText;
      document.getElementById('assistantResponse').textContent = result.assistantText;
      document.getElementById('status').textContent = 'Ready';
    },
    onError: (err) => {
      console.error('Voice Chat error:', err);
      document.getElementById('status').textContent = 'Error occurred';
    }
  });
};

// Stop the conversation
const stopConversation = () => {
  voiceChat.stop();
};`}
              </CodeBlock>
            </DocSection>

            <DocSection title="Customization Options">
              <p className="mb-4">
                Voice Chat can be customized in several ways:
              </p>
              <CodeBlock language="javascript">
{`const voiceChat = new ServiqAI.VoiceChat({
  apiKey: 'YOUR_API_KEY',
  voice: 'sarah', // Choose voice personality
  language: 'en-US',
  responseDelay: 300, // Slight delay before responding (ms)
  conversationContext: {
    // Provide context for the conversation
    userName: 'Alex',
    preferences: ['quick responses', 'technical information'],
    previousInteractions: [...] // History of interactions
  },
  domainKnowledge: {
    // Custom domain information
    products: ['ProductA', 'ProductB', 'ProductC'],
    faqData: {...} // Custom FAQ database
  }
});`}
              </CodeBlock>
            </DocSection>

            <div className="mt-12 flex justify-center gap-4">
              <Button asChild className="gradient-primary">
                <Link to="/developers/documentation/voice-assistant-implementation">Voice Assistant Guide</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/developers/documentation/performance-optimization">Optimization Tips</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default VoiceChatDocs;
