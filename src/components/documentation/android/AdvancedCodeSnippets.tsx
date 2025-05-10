
import CodeBlock from "../CodeBlock";

export const AssistantIntegrationSnippet = () => (
  <CodeBlock>{`val assistant = ServiqAI.createAssistant()
                  
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
    
    override fun onError(errorObj: AssistantError) {
        Log.e("Assistant", "Error: \${errorObj.message}")
        showErrorMessage(errorObj.message)
    }
})
                  
// Later, to stop the conversation
assistant.stopConversation()`}</CodeBlock>
);

export const VoiceCommandsSnippet = () => (
  <CodeBlock>{`val commandHandler = ServiqAI.createCommandHandler()
                  
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
commandHandler.startListening()`}</CodeBlock>
);

export const TextToSpeechSnippet = () => (
  <CodeBlock>{`val tts = ServiqAI.createSpeechSynthesizer()
                  
tts.speak("Hello, welcome to the app!") { err ->
    err?.let {
        Log.e("TTS", "Error: \${err.message}")
    }
}
                  
// With custom voice and options
val options = TTSOptions(
    voice = "michael",
    speed = 1.0f,
    pitch = 1.0f
)
                  
tts.speak("How can I help you today?", options)`}</CodeBlock>
);

export const PermissionsSnippet = () => (
  <CodeBlock>{`<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />`}</CodeBlock>
);

export const RequestPermissionsSnippet = () => (
  <CodeBlock>{`private fun checkPermissions() {
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
}`}</CodeBlock>
);

export const OfflineSupportSnippet = () => (
  <CodeBlock>{`// Download the language model
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
        
        override fun onError(errorObj: Exception) {
            Log.e("Offline", "Download failed: \${errorObj.message}")
        }
    }
)
                  
// Enable offline mode
private fun enableOfflineMode() {
    val options = RecognizerOptions.Builder()
        .preferOffline(true)
        .build()
    
    recognizer.startListening(options)
}`}</CodeBlock>
);
