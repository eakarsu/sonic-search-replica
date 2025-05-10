
import CodeBlock from "../CodeBlock";

export const ProjectGradleSnippet = () => (
  <CodeBlock>{`allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" } // Add this line
    }
}`}</CodeBlock>
);

export const AppGradleSnippet = () => (
  <CodeBlock>{`dependencies {
    implementation 'com.serviqai:voice-sdk:1.0.0'
}`}</CodeBlock>
);
