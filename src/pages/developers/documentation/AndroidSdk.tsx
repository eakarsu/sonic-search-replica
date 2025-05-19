
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DocSection from "@/components/documentation/DocSection";
import {
  KotlinInitializeSnippet,
  JavaInitializeSnippet,
  KotlinVoiceRecognitionSnippet
} from "@/components/documentation/android/SetupCodeSnippets";
import {
  AssistantIntegrationSnippet,
  VoiceCommandsSnippet,
  TextToSpeechSnippet,
  PermissionsSnippet,
  RequestPermissionsSnippet,
  OfflineSupportSnippet
} from "@/components/documentation/android/AdvancedCodeSnippets";
import {
  ProjectGradleSnippet,
  AppGradleSnippet
} from "@/components/documentation/android/GradleSnippets";

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
              
              <DocSection title="Requirements">
                <ul>
                  <li>Android API level 21 (Android 5.0) or higher</li>
                  <li>Java 8 or Kotlin 1.5+</li>
                  <li>ServiqAI developer account and API key</li>
                </ul>
              </DocSection>

              <DocSection title="Installation">
                <p>
                  Add the SDK to your project using Gradle.
                </p>
                
                <h4>In your project-level build.gradle:</h4>
                <ProjectGradleSnippet />
                
                <h4>In your app-level build.gradle:</h4>
                <AppGradleSnippet />
              </DocSection>

              <DocSection title="Setup and Configuration">
                <p>
                  Initialize the SDK in your Application class:
                </p>
                
                <h4>Kotlin</h4>
                <KotlinInitializeSnippet />
                
                <h4>Java</h4>
                <JavaInitializeSnippet />
              </DocSection>

              <DocSection title="Basic Usage">
                <p>
                  Implement voice recognition in your Activity or Fragment:
                </p>
                
                <h4>Kotlin</h4>
                <KotlinVoiceRecognitionSnippet />
              </DocSection>

              <DocSection title="Voice Assistant Integration">
                <p>
                  For a complete voice assistant experience:
                </p>
                <AssistantIntegrationSnippet />
              </DocSection>

              <DocSection title="Custom Voice Commands">
                <p>
                  Define custom voice commands for your app:
                </p>
                <VoiceCommandsSnippet />
              </DocSection>

              <DocSection title="Text-to-Speech">
                <p>
                  Generate spoken responses:
                </p>
                <TextToSpeechSnippet />
              </DocSection>

              <DocSection title="Permissions">
                <p>
                  The SDK will help you request the necessary permissions, but you should also add them to your 
                  AndroidManifest.xml:
                </p>
                <PermissionsSnippet />
                
                <p>
                  Request the permissions in your Activity:
                </p>
                <RequestPermissionsSnippet />
              </DocSection>

              <DocSection title="Offline Support">
                <p>
                  Enable offline voice recognition:
                </p>
                <OfflineSupportSnippet />
              </DocSection>
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
