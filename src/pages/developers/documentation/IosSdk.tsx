
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const IosSdk = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">iOS SDK</h1>
              <p className="text-xl text-gray-700 mb-6">
                Integrate voice capabilities into your iOS applications with our Swift SDK.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>ServiqAI iOS SDK</h2>
              <p>
                The ServiqAI iOS SDK allows you to easily add voice recognition, voice commands, and 
                conversational interfaces to your iOS applications.
              </p>
              
              <h3>Requirements</h3>
              <ul>
                <li>iOS 14.0 or later</li>
                <li>Xcode 13.0 or later</li>
                <li>Swift 5.0 or later</li>
                <li>ServiqAI developer account and API key</li>
              </ul>

              <h3>Installation</h3>
              <p>
                You can add the SDK to your project using Swift Package Manager, CocoaPods, or Carthage.
              </p>
              
              <h4>Swift Package Manager</h4>
              <p>Add the following to your Package.swift file:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`dependencies: [
    .package(url: "https://github.com/serviqai/ios-sdk.git", from: "1.0.0")
]`}
                </code>
              </pre>
              
              <h4>CocoaPods</h4>
              <p>Add the following to your Podfile:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`pod 'ServiqAIVoiceSDK', '~> 1.0'`}
                </code>
              </pre>
              <p>Then run:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`pod install`}
                </code>
              </pre>
              
              <h4>Carthage</h4>
              <p>Add the following to your Cartfile:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`github "serviqai/ios-sdk" ~> 1.0`}
                </code>
              </pre>
              <p>Then run:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`carthage update`}
                </code>
              </pre>

              <h3>Setup and Configuration</h3>
              <p>
                Before using the SDK, you need to initialize it with your API key. The best place to do this is 
                in your AppDelegate:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`import ServiqAIVoiceSDK
                  
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        ServiqAI.shared.configure(apiKey: "YOUR_API_KEY")
        
        // Optional configuration
        ServiqAI.shared.setLanguage("en-US")
        ServiqAI.shared.enableDebugLogging(true)
        
        return true
    }
}`}
                </code>
              </pre>

              <h3>Basic Usage</h3>
              <p>
                Here's how to implement basic voice recognition in your app:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`import ServiqAIVoiceSDK
                  
class VoiceViewController: UIViewController {
    
    private let recognizer = ServiqAI.shared.createRecognizer()
    
    @IBAction func startListeningTapped(_ sender: UIButton) {
        recognizer.startListening { [weak self] result in
            switch result {
            case .success(let transcript):
                self?.handleTranscript(transcript)
            case .failure(let error):
                self?.handleError(error)
            }
        }
    }
    
    @IBAction func stopListeningTapped(_ sender: UIButton) {
        recognizer.stopListening()
    }
    
    private func handleTranscript(_ transcript: String) {
        print("User said: \\(transcript)")
        // Process the transcript...
    }
    
    private func handleError(_ error: ServiqAIError) {
        print("Error: \\(error.localizedDescription)")
        // Handle the error...
    }
}`}
                </code>
              </pre>

              <h3>Using the Voice Assistant</h3>
              <p>
                For a complete voice assistant experience:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`let assistant = ServiqAI.shared.createAssistant()
                  
assistant.startConversation { [weak self] state in
    switch state {
    case .listening:
        self?.updateUI(isListening: true)
    case .processing:
        self?.updateUI(isProcessing: true)
    case .speaking(let text):
        self?.updateUI(isSpeaking: true, text: text)
    case .error(let error):
        self?.handleError(error)
    case .idle:
        self?.updateUI(isIdle: true)
    }
}
                  
// Stop the conversation when done
assistant.stopConversation()`}
                </code>
              </pre>

              <h3>Custom Voice Commands</h3>
              <p>
                Define custom voice commands for your app:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`let commandHandler = ServiqAI.shared.createCommandHandler()
                  
// Add commands
commandHandler.addCommand("open settings") { [weak self] in
    self?.openSettings()
}
                  
commandHandler.addCommand("show profile for {name}") { [weak self] params in
    if let name = params["name"] {
        self?.showProfile(for: name)
    }
}
                  
// Start listening for commands
commandHandler.startListening()`}
                </code>
              </pre>

              <h3>Text-to-Speech</h3>
              <p>
                Generate spoken responses:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`let tts = ServiqAI.shared.createSpeechSynthesizer()
                  
tts.speak("Hello, how can I help you today?") { error in
    if let error = error {
        print("TTS Error: \\(error.localizedDescription)")
    }
}
                  
// With custom voice and options
let options = TTSOptions(
    voice: "emma",
    speed: 1.1,
    pitch: 1.0
)
                  
tts.speak("Welcome to our app!", options: options)`}
                </code>
              </pre>

              <h3>Privacy and Permissions</h3>
              <p>
                Your app must request microphone permission to use voice recognition. Add the following to your 
                Info.plist:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`<key>NSMicrophoneUsageDescription</key>
<string>This app uses the microphone for voice commands.</string>
                  
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app uses speech recognition for voice commands.</string>`}
                </code>
              </pre>

              <h3>Offline Mode</h3>
              <p>
                Enable offline voice recognition for basic commands:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Download language model
ServiqAI.shared.downloadOfflineModel("en-US") { result in
    switch result {
    case .success:
        print("Offline model ready")
        
        // Enable offline mode
        let options = RecognizerOptions(preferOffline: true)
        self.recognizer.startListening(options: options)
        
    case .failure(let error):
        print("Failed to download model: \\(error)")
    }
}`}
                </code>
              </pre>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/android-sdk">Android SDK →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/web-sdk">Web SDK →</Link>
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

export default IosSdk;
