
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WebSdk = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Web SDK</h1>
              <p className="text-xl text-gray-700 mb-6">
                Implement voice features in web applications using our JavaScript SDK.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>ServiqAI Web SDK</h2>
              <p>
                The ServiqAI Web SDK allows you to add voice recognition, natural language understanding, and 
                conversational AI to your web applications.
              </p>
              
              <h3>Requirements</h3>
              <ul>
                <li>Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
                <li>HTTPS connection (required for microphone access)</li>
                <li>ServiqAI developer account and API key</li>
              </ul>

              <h3>Installation</h3>
              <p>
                You can add the SDK to your project using npm/yarn or via a CDN.
              </p>
              
              <h4>Using npm/yarn:</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`# Using npm
npm install serviqai-web-sdk
                  
# Using yarn
yarn add serviqai-web-sdk`}
                </code>
              </pre>
              
              <h4>Using CDN:</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`<script src="https://cdn.serviqai.com/sdk/v1/serviqai.min.js"></script>`}
                </code>
              </pre>

              <h3>Setup and Configuration</h3>
              <p>
                Initialize the SDK before using any features:
              </p>
              
              <h4>ES6 Module:</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`import ServiqAI from 'serviqai-web-sdk';
                  
// Initialize the SDK
ServiqAI.initialize({
    apiKey: 'YOUR_API_KEY',
    language: 'en-US', // optional
    debugMode: false // optional
});`}
                </code>
              </pre>
              
              <h4>Script Tag:</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`<script>
  // Initialize the SDK
  window.ServiqAI.initialize({
      apiKey: 'YOUR_API_KEY',
      language: 'en-US', // optional
      debugMode: false // optional
  });
</script>`}
                </code>
              </pre>

              <h3>Basic Speech Recognition</h3>
              <p>
                Implement simple voice recognition:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`const recognizer = ServiqAI.createRecognizer();
                  
// Start listening
function startListening() {
    recognizer.start({
        onResult: (text) => {
            console.log('User said:', text);
            document.getElementById('result').textContent = text;
        },
        onPartialResult: (partialText) => {
            document.getElementById('partial-result').textContent = partialText;
        },
        onError: (error) => {
            console.error('Recognition error:', error);
        }
    });
}
                  
// Stop listening
function stopListening() {
    recognizer.stop();
}
                  
// Button event listeners
document.getElementById('start-button').addEventListener('click', startListening);
document.getElementById('stop-button').addEventListener('click', stopListening);`}
                </code>
              </pre>

              <h3>Voice Assistant</h3>
              <p>
                Create a complete voice assistant:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`const assistant = ServiqAI.createAssistant();
                  
// Configure the assistant
assistant.configure({
    name: 'Aria', // optional
    voice: 'female', // optional
    wakeWord: 'hey assistant', // optional wake word
    continuous: true // listen continuously for wake word
});
                  
// Start the assistant
assistant.start({
    onStateChange: (state) => {
        switch (state) {
            case 'idle':
                updateUI('idle');
                break;
            case 'listening':
                updateUI('listening');
                break;
            case 'processing':
                updateUI('processing');
                break;
            case 'speaking':
                updateUI('speaking');
                break;
        }
    },
    onResult: (result) => {
        // Result contains the user's input and assistant's response
        console.log('User:', result.input);
        console.log('Assistant:', result.response);
        
        // Display the response
        document.getElementById('assistant-response').textContent = result.response;
    },
    onError: (error) => {
        console.error('Assistant error:', error);
    }
});
                  
// Stop the assistant
function stopAssistant() {
    assistant.stop();
}`}
                </code>
              </pre>

              <h3>Custom Voice Commands</h3>
              <p>
                Define custom voice commands for your web app:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`const commandHandler = ServiqAI.createCommandHandler();
                  
// Add commands
commandHandler.addCommand('open menu', () => {
    openMenu();
});
                  
commandHandler.addCommand('go to {page}', (params) => {
    if (params.page) {
        navigateToPage(params.page);
    }
});
                  
commandHandler.addCommand('search for {query}', (params) => {
    if (params.query) {
        searchFor(params.query);
    }
});
                  
// Start listening for commands
commandHandler.start();
                  
// Stop listening for commands
function stopCommandHandler() {
    commandHandler.stop();
}`}
                </code>
              </pre>

              <h3>Text-to-Speech</h3>
              <p>
                Generate spoken output:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`const tts = ServiqAI.createSpeechSynthesizer();
                  
// Basic usage
tts.speak('Hello, welcome to our website!');
                  
// With options
tts.speak('How can I help you today?', {
    voice: 'emma', // voice name
    speed: 1.2, // speech rate
    pitch: 1.0, // voice pitch
    onStart: () => {
        console.log('Speech started');
    },
    onFinish: () => {
        console.log('Speech finished');
    },
    onError: (error) => {
        console.error('TTS error:', error);
    }
});
                  
// Stop speaking
function stopSpeaking() {
    tts.stop();
}`}
                </code>
              </pre>

              <h3>Handling Browser Permissions</h3>
              <p>
                The SDK will automatically request microphone permission, but you may want to handle this explicitly:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`async function checkMicrophonePermission() {
    try {
        const permissionStatus = await ServiqAI.checkPermissions();
        
        if (permissionStatus === 'granted') {
            console.log('Microphone permission already granted');
            startApp();
        } else if (permissionStatus === 'prompt') {
            console.log('Need to request microphone permission');
            requestPermission();
        } else {
            console.error('Microphone permission denied');
            showPermissionError();
        }
    } catch (error) {
        console.error('Error checking permissions:', error);
    }
}
                  
async function requestPermission() {
    try {
        const result = await ServiqAI.requestPermissions();
        
        if (result === 'granted') {
            startApp();
        } else {
            showPermissionError();
        }
    } catch (error) {
        console.error('Error requesting permission:', error);
    }
}`}
                </code>
              </pre>

              <h3>Advanced Usage</h3>
              
              <h4>Custom Domain Training</h4>
              <p>
                Improve recognition for domain-specific terms:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Add domain-specific terms
ServiqAI.addCustomTerms([
    'ServiqAI',
    'voice recognition',
    'speech synthesis',
    'natural language understanding'
]);
                  
// Add phrases with higher weight
ServiqAI.addCustomPhrases([
    { text: 'show me the documentation', weight: 2.0 },
    { text: 'how do I integrate the SDK', weight: 1.5 }
]);`}
                </code>
              </pre>
              
              <h4>Analytics Integration</h4>
              <p>
                Track usage and performance:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Enable analytics
ServiqAI.enableAnalytics({
    trackUsage: true,
    trackPerformance: true,
    anonymizeData: true // for privacy
});`}
                </code>
              </pre>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/voice-assistant-implementation">Voice Assistant Implementation →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/custom-domain-creation">Custom Domain Creation →</Link>
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

export default WebSdk;
