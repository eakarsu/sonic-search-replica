
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PerformanceOptimization = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Performance Optimization</h1>
              <p className="text-xl text-gray-700 mb-6">
                Techniques for optimizing the performance and accuracy of voice recognition.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Optimizing Voice Recognition Performance</h2>
              <p>
                This guide provides strategies and techniques to optimize the performance of your voice recognition 
                implementations across different metrics including accuracy, speed, and resource usage.
              </p>
              
              <h3>Key Performance Metrics</h3>
              <p>
                Before optimizing, identify which metrics matter most for your application:
              </p>
              <ul>
                <li><strong>Recognition Accuracy</strong> - Word Error Rate (WER) and Intent Recognition Accuracy</li>
                <li><strong>Latency</strong> - Time from end of speech to result delivery</li>
                <li><strong>Response Time</strong> - End-to-end time from user query to system response</li>
                <li><strong>Resource Usage</strong> - CPU, memory, bandwidth, and battery consumption</li>
                <li><strong>Reliability</strong> - Performance in challenging conditions (noise, accents, etc.)</li>
              </ul>

              <h3>Accuracy Optimization</h3>
              
              <h4>Custom Domain Configuration</h4>
              <p>
                Fine-tune your domain configuration for improved accuracy:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Add weighted phrases for better recognition
ServiqAI.addCustomPhrases([
    { text: 'configure system settings', weight: 2.0 },
    { text: 'adjust audio levels', weight: 1.5 }
]);
                  
// Add domain-specific terminology
ServiqAI.addCustomTerms([
    'API endpoint',
    'REST interface',
    'OAuth authentication'
]);`}
                </code>
              </pre>

              <h4>Context-Aware Recognition</h4>
              <p>
                Provide recognition context to improve accuracy:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Provide context based on application state
recognizer.start({
    context: {
        // Current screen or state
        currentView: 'playlist',
        
        // Recently used items
        recentItems: ['Jazz Favorites', 'Running Mix', 'Daily Podcast'],
        
        // Current user activity
        userActivity: 'browsing'
    },
    onResult: (result) => {
        console.log('Recognition result:', result);
    }
});`}
                </code>
              </pre>

              <h4>Acoustic Environment Adaptation</h4>
              <p>
                Optimize for different acoustic environments:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Configure for noisy environments
recognizer.start({
    acousticOptions: {
        environmentType: 'noisy', // 'quiet', 'moderate', 'noisy', 'very_noisy'
        noiseReduction: true,
        echoCancellation: true,
        automaticGainControl: true
    },
    onResult: (result) => {
        console.log('Recognition result:', result);
    }
});`}
                </code>
              </pre>

              <h3>Latency Optimization</h3>
              
              <h4>Edge Processing</h4>
              <p>
                Use on-device processing for reduced latency:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Download and enable edge models
ServiqAI.downloadEdgeModel('en-US', {
    components: ['asr', 'nlu'], // ASR = speech recognition, NLU = natural language understanding
    size: 'compact', // 'compact' or 'full'
    onProgress: (progress) => {
        console.log(\`Download progress: \${progress * 100}%\`);
    },
    onComplete: () => {
        console.log('Edge model ready');
        
        // Enable edge processing
        recognizer.start({
            processingMode: 'edge', // 'edge', 'cloud', or 'hybrid'
            onResult: (result) => {
                console.log('Recognition result:', result);
            }
        });
    }
});`}
                </code>
              </pre>

              <h4>Streaming Recognition</h4>
              <p>
                Use streaming recognition for faster results:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Enable streaming recognition
recognizer.start({
    streaming: true,
    onPartialResult: (partialText) => {
        // Update UI with interim results
        displayInterimResults(partialText);
    },
    onResult: (finalText) => {
        // Process final result
        processResult(finalText);
    }
});`}
                </code>
              </pre>

              <h4>Connection Optimization</h4>
              <p>
                Optimize for varying network conditions:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Configure network strategy
ServiqAI.configure({
    network: {
        adaptiveQuality: true, // Adjust quality based on connection
        reconnectStrategy: 'aggressive', // 'conservative' or 'aggressive'
        cacheResults: true, // Cache recent recognition results
        audioCompression: 'adaptive' // 'none', 'light', 'medium', 'high', 'adaptive'
    }
});`}
                </code>
              </pre>

              <h3>Resource Usage Optimization</h3>
              
              <h4>Efficient Listening Modes</h4>
              <p>
                Configure different listening modes to conserve resources:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Wake word detection (most efficient)
recognizer.startWakeWordDetection({
    wakeWords: ['hey assistant', 'hello assistant'],
    sensitivity: 0.7, // 0.0-1.0, higher values are more sensitive
    onWakeWordDetected: () => {
        // Start full recognition when wake word is detected
        recognizer.startListening();
    }
});
                  
// Voice activity detection (moderate efficiency)
recognizer.start({
    vadMode: 'aggressive', // 'relaxed', 'moderate', 'aggressive'
    vadTimeout: 1000, // ms of silence before stopping
    onResult: (result) => {
        console.log('Recognition result:', result);
    }
});`}
                </code>
              </pre>

              <h4>Resource-Conscious Configuration</h4>
              <p>
                Adjust settings based on device capabilities:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Check device capabilities
const deviceCapabilities = ServiqAI.checkDeviceCapabilities();
                  
// Configure based on capabilities
const configOptions = {
    modelSize: deviceCapabilities.isHighEnd ? 'full' : 'compact',
    processingMode: deviceCapabilities.isLowPower ? 'cloud' : 'hybrid',
    audioSampleRate: deviceCapabilities.isLowEnd ? 16000 : 44100,
    multiChannelProcessing: deviceCapabilities.hasMultipleMics
};
                  
ServiqAI.configure(configOptions);`}
                </code>
              </pre>

              <h4>Strategic Processing Delegation</h4>
              <p>
                Intelligently choose where processing happens:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Dynamic processing mode selection
function selectOptimalProcessingMode() {
    const batteryLevel = getBatteryLevel(); // Your function to check battery
    const networkQuality = checkNetworkQuality(); // Your function to check network
    
    if (batteryLevel < 0.2) {
        // Battery is low, use cloud processing to save power
        return 'cloud';
    } else if (networkQuality === 'poor') {
        // Poor network, use edge processing
        return 'edge';
    } else {
        // Good conditions, use hybrid for best performance
        return 'hybrid';
    }
}
                  
// Start recognition with optimal mode
recognizer.start({
    processingMode: selectOptimalProcessingMode(),
    onResult: (result) => {
        console.log('Recognition result:', result);
    }
});`}
                </code>
              </pre>

              <h3>Reliability in Challenging Conditions</h3>
              
              <h4>Noise-Resilient Recognition</h4>
              <p>
                Improve performance in noisy environments:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Configure for noise resilience
recognizer.start({
    noiseHandling: {
        noiseReduction: 'high', // 'off', 'low', 'medium', 'high'
        acousticEchoCancellation: true,
        beamforming: true, // If device has multiple microphones
        adaptiveFiltering: true
    },
    onResult: (result) => {
        console.log('Recognition result:', result);
    }
});`}
                </code>
              </pre>

              <h4>Accent and Dialect Adaptation</h4>
              <p>
                Improve recognition across different accents:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Enable user adaptation
ServiqAI.enableUserAdaptation({
    collectSamples: true,
    adaptationRate: 'moderate', // 'slow', 'moderate', 'fast'
    persistProfile: true, // Save adaptation between sessions
    userIdentifier: 'user123' // To track specific user's profile
});`}
                </code>
              </pre>

              <h3>Measuring and Monitoring Performance</h3>
              <p>
                Implement analytics to track and optimize performance:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Enable performance monitoring
ServiqAI.enablePerformanceMonitoring({
    metrics: ['accuracy', 'latency', 'resourceUsage'],
    sampleRate: 0.1, // Log 10% of interactions
    detailedLogging: true,
    onReport: (performanceData) => {
        console.log('Performance data:', performanceData);
        // Send to your analytics system
    }
});
                  
// Get performance statistics
ServiqAI.getPerformanceStats()
    .then(stats => {
        console.log('Avg. recognition time:', stats.avgRecognitionTime);
        console.log('Recognition success rate:', stats.successRate);
        console.log('Word error rate:', stats.wordErrorRate);
    });`}
                </code>
              </pre>

              <h3>A/B Testing for Optimization</h3>
              <p>
                Systematically test different configurations:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`// Define test configurations
const testConfigs = [
    {
        name: 'baseline',
        config: { processingMode: 'cloud', vadMode: 'moderate' }
    },
    {
        name: 'edgeProcessing',
        config: { processingMode: 'edge', vadMode: 'aggressive' }
    },
    {
        name: 'hybrid',
        config: { processingMode: 'hybrid', vadMode: 'moderate' }
    }
];
                  
// Assign user to test group
const testGroup = assignUserToTestGroup(userId, testConfigs);
                  
// Apply test configuration
recognizer.start({
    ...testGroup.config,
    onResult: (result) => {
        logTestResult(testGroup.name, result);
    }
});`}
                </code>
              </pre>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/security-best-practices">Security Best Practices →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation">Back to Documentation</Link>
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

export default PerformanceOptimization;
