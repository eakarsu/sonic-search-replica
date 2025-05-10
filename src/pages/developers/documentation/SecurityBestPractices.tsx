
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SecurityBestPractices = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Security Best Practices</h1>
              <p className="text-xl text-gray-700 mb-6">
                Guidelines for implementing secure voice interactions in your applications.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Voice AI Security Best Practices</h2>
              <p>
                Security is paramount when implementing voice technology. This guide outlines best practices 
                for securing your voice-enabled applications and protecting user data.
              </p>
              
              <h3>Key Security Considerations</h3>
              <p>
                Voice applications present unique security challenges:
              </p>
              <ul>
                <li><strong>Privacy</strong> - Voice data may contain sensitive personal information</li>
                <li><strong>Authentication</strong> - Voice can be used as a biometric identifier</li>
                <li><strong>Impersonation</strong> - The risk of synthetic voice attacks</li>
                <li><strong>Consent</strong> - Ensuring users understand when and how their voice is processed</li>
                <li><strong>Data Storage</strong> - Secure handling of voice recordings and derived data</li>
              </ul>

              <h3>Securing API Keys and Credentials</h3>
              
              <h4>Secure Storage of API Keys</h4>
              <p>
                Never expose API keys in client-side code:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // NEVER do this (in client-side code):
                  const apiKey = "sk_live_abcdefg123456";
                  
                  // Instead, use environment variables on your server
                  const apiKey = process.env.SERVIQAI_API_KEY;
                  
                  // For mobile apps, use secure storage
                  // iOS (Swift)
                  KeychainWrapper.standard.set(apiKey, forKey: "ServiqAIApiKey")
                  
                  // Android (Kotlin)
                  val encryptedSharedPreferences = EncryptedSharedPreferences.create(...)
                  encryptedSharedPreferences.edit().putString("serviqai_api_key", apiKey).apply()
                </code>
              </pre>

              <h4>Proxy API Requests</h4>
              <p>
                Route API calls through your server to protect credentials:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Client-side code
                  async function recognizeSpeech(audioData) {
                      // Send to your server, not directly to ServiqAI
                      const response = await fetch('/api/speech-to-text', {
                          method: 'POST',
                          body: audioData
                      });
                      return response.json();
                  }
                  
                  // Server-side code (Node.js example)
                  app.post('/api/speech-to-text', async (req, res) => {
                      try {
                          // Forward to ServiqAI with your API key
                          const serviqResponse = await fetch('https://api.serviqai.com/v1/recognize', {
                              method: 'POST',
                              headers: {
                                  'Authorization': `Bearer ${process.env.SERVIQAI_API_KEY}`
                              },
                              body: req.body
                          });
                          
                          const data = await serviqResponse.json();
                          res.json(data);
                      } catch (error) {
                          res.status(500).json({ error: 'Recognition failed' });
                      }
                  });
                </code>
              </pre>

              <h3>User Authentication and Voice Security</h3>
              
              <h4>Voice Authentication Best Practices</h4>
              <p>
                If using voice as an authentication factor:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Implement multi-factor authentication
                  async function authenticateUser(userId, voiceSample) {
                      // 1. Verify voice biometrics
                      const voiceMatch = await ServiqAI.verifyVoiceBiometrics({
                          userId: userId,
                          voiceSample: voiceSample,
                          strictnessLevel: 'high', // 'low', 'medium', 'high'
                          antiSpoofing: true // Enable anti-spoofing protection
                      });
                      
                      if (!voiceMatch.isMatch) {
                          return { authenticated: false, reason: 'voice_mismatch' };
                      }
                      
                      // 2. Request secondary verification (e.g., OTP)
                      const otpVerified = await verifyOTP(userId);
                      
                      // 3. Return authentication result
                      return {
                          authenticated: voiceMatch.isMatch && otpVerified,
                          confidence: voiceMatch.confidence,
                          antiSpoofScore: voiceMatch.antiSpoofScore
                      };
                  }
                </code>
              </pre>

              <h4>Liveness Detection</h4>
              <p>
                Implement liveness detection to prevent replay attacks:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Challenge-response for liveness verification
                  async function verifyLiveness(userId) {
                      // 1. Generate a random phrase for the user to speak
                      const challenge = generateRandomPhrase();
                      
                      // 2. Ask user to speak the phrase
                      displayChallenge(challenge);
                      
                      // 3. Record and verify the response
                      const voiceSample = await recordVoice();
                      
                      const livenessResult = await ServiqAI.verifyLiveness({
                          expectedPhrase: challenge,
                          voiceSample: voiceSample,
                          userId: userId,
                          timeConstraint: 5000 // Must respond within 5 seconds
                      });
                      
                      return livenessResult;
                  }
                </code>
              </pre>

              <h3>Data Privacy and Storage</h3>
              
              <h4>Minimize Data Collection</h4>
              <p>
                Only collect and store what you absolutely need:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Configure minimal data collection
                  ServiqAI.configure({
                      dataCollection: {
                          storeAudioRecordings: false,
                          storeTranscripts: true,
                          retentionPeriod: 30, // days
                          privacyMode: 'high' // 'standard', 'high', 'maximum'
                      }
                  });
                </code>
              </pre>

              <h4>Secure Data Transmission</h4>
              <p>
                Always use encrypted connections for voice data:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Ensure secure transmission
                  ServiqAI.configure({
                      security: {
                          requireTLS: true, // Enforce TLS 1.2+
                          validateCertificates: true,
                          pinCertificates: true // For mobile apps
                      }
                  });
                </code>
              </pre>

              <h4>Data Anonymization</h4>
              <p>
                Anonymize sensitive information in voice data:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Enable automatic PII detection and redaction
                  ServiqAI.enablePrivacyProtection({
                      redactTypes: [
                          'credit_card',
                          'phone_number',
                          'email',
                          'name',
                          'address',
                          'social_security_number'
                      ],
                      redactionMode: 'mask', // 'remove', 'mask', or 'replace'
                      replacementToken: '[REDACTED]' // Used when mode is 'replace'
                  });
                </code>
              </pre>

              <h3>Obtaining and Managing User Consent</h3>
              
              <h4>Explicit Consent Flow</h4>
              <p>
                Implement clear consent flows:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Example consent workflow
                  function requestVoicePermission() {
                      return new Promise((resolve, reject) => {
                          // Display consent dialog with clear information
                          showConsentDialog({
                              title: 'Voice Processing Permission',
                              description: 'This app would like to access your microphone to process voice commands. Your voice data will be used to provide voice recognition services.',
                              dataUsage: [
                                  'Process voice commands',
                                  'Improve voice recognition quality'
                              ],
                              dataSharingPolicy: 'Your voice data is processed securely and not shared with third parties.',
                              privacyPolicyUrl: 'https://example.com/privacy',
                              onAccept: () => {
                                  // Store consent
                                  storeUserConsent('voice_processing', true);
                                  resolve(true);
                              },
                              onDeny: () => {
                                  resolve(false);
                              }
                          });
                      });
                  }
                  
                  // Check for consent before activating voice features
                  async function activateVoiceFeatures() {
                      const hasConsent = getUserConsent('voice_processing');
                      
                      if (!hasConsent) {
                          const userConsented = await requestVoicePermission();
                          if (!userConsented) {
                              showFallbackInterface();
                              return;
                          }
                      }
                      
                      // Initialize voice features
                      initializeVoiceRecognition();
                  }
                </code>
              </pre>

              <h4>Consent Management</h4>
              <p>
                Provide tools for users to manage their consent:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // Allow users to revoke consent
                  function revokeVoiceConsent() {
                      // Stop all voice processing
                      stopVoiceProcessing();
                      
                      // Update stored consent
                      storeUserConsent('voice_processing', false);
                      
                      // Delete stored voice data
                      ServiqAI.deleteUserData(userId)
                          .then(() => {
                              showConfirmation('Voice data deleted successfully');
                          })
                          .catch(error => {
                              showError('Failed to delete data: ' + error.message);
                          });
                  }
                </code>
              </pre>

              <h3>Secure Deployment</h3>
              
              <h4>Runtime Security</h4>
              <p>
                Protect your application at runtime:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  // For mobile apps, implement certificate pinning
                  // iOS (Swift)
                  let session = URLSession(configuration: .default, delegate: PinningURLSessionDelegate(), delegateQueue: nil)
                  
                  // Android (Kotlin)
                  val certificatePinner = CertificatePinner.Builder()
                      .add("api.serviqai.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
                      .build()
                  
                  val client = OkHttpClient.Builder()
                      .certificatePinner(certificatePinner)
                      .build()
                </code>
              </pre>

              <h4>Regular Security Audits</h4>
              <p>
                Regularly audit your voice implementation:
              </p>
              <ul>
                <li>Review access controls for voice data</li>
                <li>Check for compliance with privacy regulations (GDPR, CCPA, etc.)</li>
                <li>Test for voice security vulnerabilities</li>
                <li>Verify proper implementation of security measures</li>
              </ul>

              <h3>Handling Security Incidents</h3>
              <p>
                Prepare for potential security incidents:
              </p>
              <ul>
                <li>Develop an incident response plan specific to voice data</li>
                <li>Create procedures for revoking and rotating compromised API keys</li>
                <li>Establish notification protocols for affected users</li>
                <li>Implement logging and monitoring to detect suspicious activity</li>
              </ul>

              <h3>Compliance Considerations</h3>
              <p>
                Ensure your voice implementation complies with relevant regulations:
              </p>
              <ul>
                <li><strong>GDPR (EU)</strong> - User consent, data access rights, right to be forgotten</li>
                <li><strong>CCPA/CPRA (California)</strong> - Disclosure requirements, opt-out rights</li>
                <li><strong>HIPAA (US Healthcare)</strong> - Special handling for health-related voice data</li>
                <li><strong>COPPA (US Children's Privacy)</strong> - Additional requirements for services used by children</li>
                <li><strong>Biometric Privacy Laws</strong> - Special requirements for voice authentication (e.g., BIPA in Illinois)</li>
              </ul>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation">Back to Documentation</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/voice-assistant-implementation">Voice Assistant Implementation</Link>
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

export default SecurityBestPractices;
