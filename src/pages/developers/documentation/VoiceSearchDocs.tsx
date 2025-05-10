
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DocSection from "@/components/documentation/DocSection";
import CodeBlock from "@/components/documentation/CodeBlock";
import { Search } from "lucide-react";

const VoiceSearchDocs = () => {
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
              <div className="flex items-center gap-3 mb-4">
                <Search className="h-8 w-8 text-soundblue-500" />
                <h1 className="text-4xl font-bold text-soundblue-500">Voice Search Documentation</h1>
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Implement intelligent search capabilities powered by voice commands in your applications.
              </p>
            </div>

            <DocSection title="Voice Search Overview">
              <p className="mb-4">
                Voice Search technology allows users to search through your content or data using natural language voice commands. 
                Our system processes spoken queries, understands user intent, and returns relevant results without requiring 
                exact keyword matches.
              </p>
              <p className="mb-4">
                This documentation will help you implement Voice Search in your applications across web, mobile, and IoT platforms.
              </p>
            </DocSection>

            <DocSection title="Core Features">
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Semantic Understanding:</strong> Processes meaning behind queries, not just keywords</li>
                <li><strong>Noise Resilience:</strong> Accurate recognition even in noisy environments</li>
                <li><strong>Contextual Results:</strong> Search results that account for user context and preferences</li>
                <li><strong>Natural Language Queries:</strong> Users can search using conversational phrases</li>
              </ul>
            </DocSection>

            <DocSection title="Basic Implementation">
              <p className="mb-4">
                Here's a simple implementation of Voice Search in a web application:
              </p>
              <CodeBlock language="javascript">
{`// Initialize the Voice Search client
const voiceSearch = new ServiqAI.VoiceSearch({
  apiKey: 'YOUR_API_KEY',
  language: 'en-US',
  searchEndpoint: '/api/search' // Your search API endpoint
});

// Start voice search
const startVoiceSearch = () => {
  // Update UI to show listening state
  document.getElementById('searchStatus').textContent = 'Listening...';
  
  voiceSearch.listen({
    onInterimResult: (text) => {
      // Show what the user is saying in real-time
      document.getElementById('searchQuery').textContent = text;
    },
    onFinalResult: (text) => {
      document.getElementById('searchStatus').textContent = 'Searching...';
      document.getElementById('searchQuery').textContent = text;
      
      // Execute the search with the recognized text
      voiceSearch.search(text, {
        limit: 10, // Maximum number of results
        filters: {
          // Optional filters for your search
          category: 'electronics',
          priceRange: '100-500'
        }
      }).then(results => {
        // Display search results
        displayResults(results);
        document.getElementById('searchStatus').textContent = 'Ready';
      }).catch(err => {
        console.error('Search error:', err);
        document.getElementById('searchStatus').textContent = 'Search failed';
      });
    },
    onError: (err) => {
      console.error('Voice recognition error:', err);
      document.getElementById('searchStatus').textContent = 'Error occurred';
    }
  });
};

// Stop listening
const stopVoiceSearch = () => {
  voiceSearch.stop();
  document.getElementById('searchStatus').textContent = 'Ready';
};

// Display search results in the UI
function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
  
  results.forEach(item => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = \`
      <h3>\${item.title}</h3>
      <p>\${item.description}</p>
    \`;
    resultsContainer.appendChild(resultItem);
  });
}`}
              </CodeBlock>
            </DocSection>

            <DocSection title="Advanced Configuration">
              <p className="mb-4">
                Customize Voice Search to fit your application's specific needs:
              </p>
              <CodeBlock language="javascript">
{`const voiceSearch = new ServiqAI.VoiceSearch({
  apiKey: 'YOUR_API_KEY',
  language: 'en-US',
  searchEndpoint: '/api/search',
  recognition: {
    continuous: false,     // One-time search query
    interimResults: true,  // Show results as user speaks
    timeout: 5000          // Stop listening after 5 seconds of silence
  },
  searchOptions: {
    fuzzyMatching: true,   // Allow approximate matches
    rankingFactors: {
      recency: 0.3,        // Weight for recent content
      popularity: 0.5,     // Weight for popular content
      relevance: 0.7       // Weight for keyword relevance
    },
    cacheResults: true,    // Cache search results for faster retrieval
    cacheDuration: 3600    // Cache duration in seconds (1 hour)
  },
  userContext: {
    // Optional user context to personalize results
    history: ['previous search 1', 'previous search 2'],
    preferences: ['category A', 'category B'],
    location: 'New York'
  }
});`}
              </CodeBlock>
            </DocSection>

            <div className="mt-12 flex justify-center gap-4">
              <Button asChild className="gradient-primary">
                <Link to="/developers/documentation/rest-api-reference">API Reference</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/developers/documentation/performance-optimization">Optimization Guide</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default VoiceSearchDocs;
