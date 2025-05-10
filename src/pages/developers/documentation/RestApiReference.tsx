
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RestApiReference = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">REST API Reference</h1>
              <p className="text-xl text-gray-700 mb-6">
                Complete reference for our HTTP API endpoints, request formats, and responses.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>ServiqAI REST API Reference</h2>
              <p>
                This reference documentation provides details for all available REST API endpoints, including request 
                formats, response structures, and example usage.
              </p>
              
              <h3>Authentication</h3>
              <p>
                All API requests require authentication using your API key. Include your API key in the request 
                header:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
Authorization: Bearer YOUR_API_KEY
                `}</code>
              </pre>

              <h3>Base URL</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
https://api.serviqai.com/v1
                `}</code>
              </pre>

              <h3>Speech Recognition API</h3>
              
              <h4>Recognize Audio</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
POST /recognize

// Request Body (multipart/form-data)
{
  "audio": [binary audio data],
  "language": "en-US", // optional
  "model": "general", // optional
  "domain": "default" // optional
}

// Response
{
  "results": [
    {
      "text": "What's the weather like today?",
      "confidence": 0.98
    }
  ]
}
                `}</code>
              </pre>

              <h4>Streaming Recognition</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
WSS /recognize/stream

// Initial message from client
{
  "config": {
    "language": "en-US",
    "model": "general"
  }
}

// Subsequent messages contain binary audio data

// Server responses
{
  "type": "partial",
  "text": "What's the weath"
}

{
  "type": "final",
  "text": "What's the weather like today?",
  "confidence": 0.98
}
                `}</code>
              </pre>

              <h3>Natural Language Understanding API</h3>
              
              <h4>Parse Intent</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
POST /nlu/parse

// Request Body
{
  "text": "What's the weather like in San Francisco tomorrow?",
  "domain": "weather" // optional
}

// Response
{
  "intent": "get_weather_forecast",
  "confidence": 0.96,
  "entities": [
    {
      "type": "location",
      "value": "San Francisco",
      "confidence": 0.99
    },
    {
      "type": "datetime",
      "value": "2025-05-11T00:00:00Z",
      "confidence": 0.97
    }
  ]
}
                `}</code>
              </pre>

              <h3>Text-to-Speech API</h3>
              
              <h4>Generate Speech</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
POST /tts/generate

// Request Body
{
  "text": "Hello, how can I help you today?",
  "voice": "emma", // optional
  "language": "en-US", // optional
  "speed": 1.0, // optional
  "format": "mp3" // optional
}

// Response: Binary audio data with appropriate Content-Type header
                `}</code>
              </pre>

              <h3>Voice Assistant API</h3>
              
              <h4>Process Conversation Turn</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
POST /assistant/converse

// Request Body
{
  "text": "What's the weather like in San Francisco tomorrow?",
  "session_id": "user123-session456", // to maintain context
  "context": { // optional custom context
    "user_location": "San Jose"
  }
}

// Response
{
  "response": {
    "text": "Tomorrow in San Francisco, expect partly cloudy skies with a high of 68°F and a low of 54°F.",
    "speech_url": "https://cdn.serviqai.com/tts/output123.mp3" // optional
  },
  "intent": "get_weather_forecast",
  "action": {
    "name": "display_weather",
    "data": {
      "location": "San Francisco",
      "forecast": {
        "date": "2025-05-11",
        "condition": "partly_cloudy",
        "high_temp": 68,
        "low_temp": 54
      }
    }
  }
}
                `}</code>
              </pre>

              <h3>Rate Limits</h3>
              <p>
                Rate limits vary by plan level. Current limits are:
              </p>
              <ul>
                <li>Free tier: 100 requests per day</li>
                <li>Developer tier: 1,000 requests per minute</li>
                <li>Enterprise tier: Custom limits based on agreement</li>
              </ul>
              
              <p>
                When a rate limit is exceeded, the API will return a 429 Too Many Requests status code.
              </p>

              <h3>Error Handling</h3>
              <p>
                The API uses standard HTTP status codes and returns error details in the response body:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Example error response
{
  "error": {
    "code": "invalid_audio_format",
    "message": "The provided audio file format is not supported.",
    "details": "Supported formats: WAV, MP3, FLAC, OGG"
  }
}
                `}</code>
              </pre>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/ios-sdk">iOS SDK →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/android-sdk">Android SDK →</Link>
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

export default RestApiReference;
