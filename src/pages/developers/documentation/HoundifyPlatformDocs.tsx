
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DocSection from "@/components/documentation/DocSection";
import CodeBlock from "@/components/documentation/CodeBlock";
import { Podcast } from "lucide-react";

const HoundifyPlatformDocs = () => {
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
                <Podcast className="h-8 w-8 text-soundblue-500" />
                <h1 className="text-4xl font-bold text-soundblue-500">Houndify Platform Documentation</h1>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Complete documentation for our comprehensive voice AI development platform and tools.
              </p>
            </div>

            <DocSection title="Houndify Platform Overview">
              <p className="mb-4">
                Houndify is our comprehensive voice AI platform that provides developers with all the tools needed to 
                build sophisticated voice experiences. The platform combines speech recognition, natural language understanding, 
                and custom domain expertise in a unified development environment.
              </p>
              <p className="mb-4">
                This documentation will guide you through the process of using the Houndify platform to create, 
                test, and deploy voice-enabled applications.
              </p>
            </DocSection>

            <DocSection title="Platform Components">
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Developer Console:</strong> Web interface for managing your Houndify projects</li>
                <li><strong>Custom Domain Creation:</strong> Tools for building domain-specific knowledge and responses</li>
                <li><strong>Client SDKs:</strong> Libraries for iOS, Android, Web, and IoT platforms</li>
                <li><strong>Analytics Dashboard:</strong> Monitor usage and performance of your voice applications</li>
              </ul>
            </DocSection>

            <DocSection title="Getting Started">
              <p className="mb-4">
                To begin using the Houndify platform, follow these steps:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>Create a Houndify developer account at <a href="https://www.houndify.com" className="text-soundblue-500 hover:underline" target="_blank" rel="noopener noreferrer">houndify.com</a></li>
                <li>Create a new project in the developer console</li>
                <li>Generate client keys for your application</li>
                <li>Choose and integrate the appropriate SDK for your platform</li>
              </ol>
            </DocSection>

            <DocSection title="Basic Integration">
              <p className="mb-4">
                Here's an example of integrating Houndify into a web application:
              </p>
              <CodeBlock language="javascript">
{`// Initialize the Houndify client
const houndify = new Houndify.Client({
  clientId: 'YOUR_CLIENT_ID',
  clientKey: 'YOUR_CLIENT_KEY',
  authURL: '/houndify-auth', // Your authentication endpoint
  onOpen: () => {
    console.log('Houndify connection established');
  },
  onClose: () => {
    console.log('Houndify connection closed');
  },
  onError: (err) => {
    console.error('Houndify error:', err);
  }
});

// Start voice query
const startQuery = () => {
  document.getElementById('status').textContent = 'Listening...';
  
  houndify.start({
    onTranscriptionUpdate: (transcript) => {
      // Show real-time transcription
      document.getElementById('transcript').textContent = transcript;
    },
    onResponse: (response) => {
      // Handle the structured response from Houndify
      console.log('Full response:', response);
      
      // Display the written response
      document.getElementById('response').textContent = 
        response.AllResults[0].WrittenResponse;
        
      // Handle any command results or data
      if (response.AllResults[0].CommandKind) {
        handleCommand(response.AllResults[0]);
      }
      
      document.getElementById('status').textContent = 'Ready';
    }
  });
};

// Stop the voice query
const stopQuery = () => {
  houndify.stop();
};

// Handle different types of command responses
function handleCommand(result) {
  switch(result.CommandKind) {
    case 'WeatherCommand':
      displayWeather(result.WeatherResults);
      break;
    case 'MusicCommand':
      playMusic(result.MusicResults);
      break;
    // Add handlers for other command types
    default:
      console.log('Received command:', result.CommandKind);
  }
}`}
              </CodeBlock>
            </DocSection>

            <DocSection title="Custom Domain Development">
              <p className="mb-4">
                Creating a custom domain allows you to extend Houndify with specialized knowledge:
              </p>
              <CodeBlock language="javascript">
{`// Define a custom domain in Houndify Developer Console
{
  "DomainName": "CoffeeShopDomain",
  "IntentHandlers": [
    {
      "Intent": "OrderCoffee",
      "Phrases": [
        "I want to order a $CoffeeType:Type$ with $Extras:Extra$",
        "Get me a $CoffeeType:Type$",
        "I'd like a $Size:Size$ $CoffeeType:Type$"
      ],
      "Slots": {
        "Type": {
          "Type": "CoffeeTypes"
        },
        "Size": {
          "Type": "CoffeeSizes"
        },
        "Extra": {
          "Type": "CoffeeExtras"
        }
      },
      "Response": {
        "TextResponse": "I've ordered a {{Size}} {{Type}} with {{Extra}}."
      }
    }
  ],
  "SlotTypes": {
    "CoffeeTypes": {
      "Values": ["latte", "cappuccino", "americano", "espresso", "mocha"]
    },
    "CoffeeSizes": {
      "Values": ["small", "medium", "large"]
    },
    "CoffeeExtras": {
      "Values": ["extra shot", "almond milk", "oat milk", "caramel syrup", "vanilla"]
    }
  }
}`}
              </CodeBlock>
            </DocSection>

            <div className="mt-12 flex justify-center gap-4">
              <Button asChild className="gradient-primary">
                <Link to="/developers/documentation/custom-domain-creation">Domain Creation Guide</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/developers/documentation/security-best-practices">Security Best Practices</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default HoundifyPlatformDocs;
