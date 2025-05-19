
import CodeBlock from "../CodeBlock";

export const KotlinInitializeSnippet = () => (
  <CodeBlock>{`import com.serviqai.voice.ServiqAI
                  
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
}`}</CodeBlock>
);

export const JavaInitializeSnippet = () => (
  <CodeBlock>{`import com.serviqai.voice.ServiqAI;
                  
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
}`}</CodeBlock>
);

export const KotlinVoiceRecognitionSnippet = () => (
  <CodeBlock>{`import com.serviqai.voice.VoiceRecognizer
                  
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
            
            override fun onError(errorMessage: VoiceRecognizerError) {
                // Handle errors
                Log.e("VoiceDemo", "Error: \${errorMessage.message}")
            }
        })
    }
}`}</CodeBlock>
);
