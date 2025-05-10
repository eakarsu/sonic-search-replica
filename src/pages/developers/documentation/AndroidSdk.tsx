
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AndroidSdk = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Android SDK</h1>
              <p className="text-xl text-gray-700 mb-6">
                Add voice interactions to your Android apps with our Kotlin/Java SDK.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>ServiqAI Android SDK</h2>
              <p>
                The ServiqAI Android SDK enables you to add powerful voice recognition, voice commands, and 
                conversational interfaces to your Android applications.
              </p>
              
              <h3>Requirements</h3>
              <ul>
                <li>Android API level 21 (Android 5.0) or higher</li>
                <li>Java 8 or Kotlin 1.5+</li>
                <li>ServiqAI developer account and API key</li>
              </ul>

              <h3>Installation</h3>
              <p>
                Add the SDK to your project using Gradle.
              </p>
              
              <h4>In your project-level build.gradle:</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" } // Add this line
    }
}`}
                </code>
              </pre>
              
              <h4>In your app-level build.gradle:</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`dependencies {
    implementation 'com.serviqai:voice-sdk:1.0.0'
}`}
                </code>
              </pre>

              <h3>Setup and Configuration</h3>
              <p>
                Initialize the SDK in your Application class:
              </p>
              
              <h4>Kotlin</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`import com.serviqai.voice.ServiqAI
                  
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        ServiqAI.initialize(
            context = this,
            apiKey = "YOUR_API_KEY"
        )
        
        // Optional configuration
        ServiqAI.setLanguage("en-US")
        ServiqAI.setDebugLogging(true)
    }
}`}
                </code>
              </pre>
              
              <h4>Java</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`import com.serviqai.voice.ServiqAI;
                  
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        ServiqAI.initialize(
            this,
            "YOUR_API_KEY"
        );
        
        // Optional configuration
        ServiqAI.setLanguage("en-US");
        ServiqAI.setDebugLogging(true);
    }
}`}
                </code>
              </pre>

              <h3>Basic Usage</h3>
              <p>
                Implement voice recognition in your Activity or Fragment:
              </p>
              
              <h4>Kotlin</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`import com.serviqai.voice.VoiceRecognizer
                  
class MainActivity : AppCompatActivity() {

    private lateinit var recognizer: VoiceRecognizer
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        recognizer = ServiqAI.createRecognizer()
        
        findViewById<Button>(R.id.btnStartListening).setOnClickListener {
            startListening()
        }
        
        findViewById<Button>(R.id.btnStopListening).setOnClickListener {
            recognizer.stopListening()
        }
    }
    
    private fun startListening() {
        recognizer.startListening(object : VoiceRecognizer.Callback {
            override fun onResult(transcript: String) {
                // Handle the recognized text
                Log.d("VoiceDemo", "User said: $transcript")
            }
            
            override fun onPartialResult(partialTranscript: String) {
                // Handle partial recognition results
            }
            
            override fun onError(error: VoiceRecognizerError) {
                // Handle errors
                Log.e("VoiceDemo", "Error: ${error.message}")
            }
        })
    }
}`}
                </code>
              </pre>

              <h3>Voice Assistant Integration</h3>
              <p>
                For a complete voice assistant experience:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`val assistant = ServiqAI.createAssistant()
                  
assistant.startConversation(object : AssistantCallback {
    override fun onStateChanged(state: AssistantState) {
        when (state) {
            is AssistantState.Listening -> updateUI(isListening = true)
            is AssistantState.Processing -> updateUI(isProcessing = true)
            is AssistantState.Speaking -> {
                updateUI(isSpeaking = true)
                textView.text = state.text
            }
            is AssistantState.Idle -> updateUI(isIdle = true)
        }
    }
    
    override fun onError(error: AssistantError) {
        Log.e("Assistant", "Error: ${error.message}")
        showErrorMessage(error.message)
    }
})
                  
// Later, to stop the conversation
assistant.stopConversation()`}
                </code>
              </pre>

              <h3>Custom Voice Commands</h3>
              <p>
                Define custom voice commands for your app:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`val commandHandler = ServiqAI.createCommandHandler()
                  
// Add commands
commandHandler.addCommand("open settings") {
    openSettings()
}
                  
commandHandler.addCommand("show profile for {name}") { params ->
    val name = params["name"]
    if (name != null) {
        showProfile(name)
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
                  {`val tts = ServiqAI.createSpeechSynthesizer()
                  
tts.speak("Hello, welcome to the app!") { error ->
    error?.let {
        Log.e("TTS", "Error: ${it.message}")
    }
}
                  
// With custom voice and options
val options = TTSOptions(
    voice = "michael",
    speed = 1.0f,
    pitch = 1.0f
)
                  
tts.speak("How can I help you today?", options)`}
                </code>
              </pre>

              <h3>Permissions</h3>
              <p>
                The SDK will help you request the necessary permissions, but you should also add them to your 
                AndroidManifest.xml:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />`}
                </code>
              </pre>
              
              <p>
                Request the permissions in your Activity:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`private fun checkPermissions() {
    if (ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.RECORD_AUDIO
        ) != PackageManager.PERMISSION_GRANTED
    ) {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.RECORD_AUDIO),
            REQUEST_RECORD_AUDIO
        )
    } else {
        // Permissions already granted, proceed with voice recognition
        startListening()
    }
}
                  
override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<String>,
    grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == REQUEST_RECORD_AUDIO && grantResults.isNotEmpty() &&
        grantResults[0] == PackageManager.PERMISSION_GRANTED
    ) {
        // Permission granted, proceed with voice recognition
        startListening()
    } else {
        // Permission denied, show a message to the user
        showPermissionDeniedMessage()
    }
}`}
                </code>
              </pre>

              <h3>Offline Support</h3>
              <p>
                Enable offline voice recognition:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Download the language model
ServiqAI.downloadOfflineModel(
    language = "en-US",
    callback = object : DownloadCallback {
        override fun onSuccess() {
            Log.d("Offline", "Model downloaded successfully")
            enableOfflineMode()
        }
        
        override fun onProgress(progress: Float) {
            progressBar.progress = (progress * 100).toInt()
        }
        
        override fun onError(error: Exception) {
            Log.e("Offline", "Download failed: ${error.message}")
        }
    }
)
                  
// Enable offline mode
private fun enableOfflineMode() {
    val options = RecognizerOptions.Builder()
        .preferOffline(true)
        .build()
    
    recognizer.startListening(options)
}`}
                </code>
              </pre>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/web-sdk">Web SDK →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/voice-assistant-implementation">Voice Assistant Implementation →</Link>
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

export default AndroidSdk;
