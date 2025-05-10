
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CustomDomainCreation = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-soundblue-500">Custom Domain Creation</h1>
              <p className="text-xl text-gray-700 mb-6">
                Create domain-specific voice models tailored to your application's needs.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Creating Custom Voice Recognition Domains</h2>
              <p>
                Custom domains significantly improve recognition accuracy for specialized vocabulary and use cases. 
                This guide walks through the process of creating, training, and deploying custom voice models.
              </p>
              
              <h3>Why Create Custom Domains?</h3>
              <p>
                While ServiqAI's general-purpose models work well for everyday language, custom domains excel at:
              </p>
              <ul>
                <li>Specialized terminology (medical, legal, technical)</li>
                <li>Product names and brand-specific vocabulary</li>
                <li>Industry jargon and acronyms</li>
                <li>Command-based interfaces with specific phrases</li>
              </ul>

              <h3>Domain Creation Process</h3>
              
              <h4>1. Gather Domain-Specific Data</h4>
              <p>
                Begin by collecting text examples that represent typical user queries in your domain:
              </p>
              <ul>
                <li>Real user queries if available (de-identified for privacy)</li>
                <li>Support chat logs or email requests</li>
                <li>Technical documentation and FAQs</li>
                <li>Sample dialogues written by domain experts</li>
              </ul>

              <h4>2. Identify Key Terms and Phrases</h4>
              <p>
                Extract important terminology from your domain:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Example for a healthcare domain
const medicalTerms = [
    'hypertension',
    'myocardial infarction',
    'arrhythmia',
    'tachycardia',
    'echocardiogram',
    // ... more medical terms
];

// Common phrases in the domain
const medicalPhrases = [
    { text: 'check my blood pressure', weight: 1.5 },
    { text: 'schedule a cardiology appointment', weight: 1.3 },
    { text: 'refill my prescription', weight: 1.4 },
    // ... more phrases with weights
];
                `}</code>
              </pre>

              <h4>3. Create a Domain Definition</h4>
              <p>
                Use the ServiqAI Developer Console or API to create your domain:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Using the API
const domainDefinition = {
    name: 'healthcare_assistant',
    description: 'Domain for healthcare voice interactions',
    language: 'en-US',
    terms: medicalTerms,
    phrases: medicalPhrases,
    intents: [
        {
            name: 'check_vitals',
            examples: [
                'check my blood pressure',
                'what\\'s my heart rate',
                'monitor my oxygen levels'
            ]
        },
        {
            name: 'schedule_appointment',
            examples: [
                'schedule a doctor appointment',
                'book a visit with my cardiologist',
                'I need to see a doctor next week'
            ]
        }
    ]
};

// Send the domain definition to the API
fetch('https://api.serviqai.com/v1/domains', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(domainDefinition)
})
.then(response => response.json())
.then(data => {
    console.log('Domain created:', data);
    const domainId = data.id;
    // Store the domain ID for later use
})
.catch(error => {
    console.error('Error creating domain:', error);
});
                `}</code>
              </pre>

              <h4>4. Train Your Domain Model</h4>
              <p>
                After creating the domain definition, train the model:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Trigger training for the domain
fetch(\`https://api.serviqai.com/v1/domains/\${domainId}/train\`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    }
})
.then(response => response.json())
.then(data => {
    console.log('Training status:', data);
    // data.status will be "training"
    // data.estimatedCompletionTime provides an estimate
})
.catch(error => {
    console.error('Error starting training:', error);
});
                `}</code>
              </pre>

              <h4>5. Monitor Training Progress</h4>
              <p>
                Check the training status:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Check training status
fetch(\`https://api.serviqai.com/v1/domains/\${domainId}\`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
})
.then(response => response.json())
.then(data => {
    console.log('Domain status:', data.status);
    // Status will be one of: "training", "ready", "failed"
})
.catch(error => {
    console.error('Error checking status:', error);
});
                `}</code>
              </pre>

              <h4>6. Test Your Custom Domain</h4>
              <p>
                Once training is complete, test the domain:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Test recognition with your domain
const recognizer = ServiqAI.createRecognizer();

recognizer.start({
    domain: 'healthcare_assistant', // Your domain name
    onResult: (result) => {
        console.log('Recognition result:', result);
    },
    onError: (error) => {
        console.error('Recognition error:', error);
    }
});
                `}</code>
              </pre>

              <h4>7. Evaluate and Iterate</h4>
              <p>
                Analyze recognition performance and gather metrics:
              </p>
              <ul>
                <li>Word Error Rate (WER) for transcription accuracy</li>
                <li>Intent recognition accuracy</li>
                <li>Entity extraction precision and recall</li>
              </ul>
              <p>
                Use these metrics to identify areas for improvement, then update your domain by adding examples for problematic cases.
              </p>

              <h3>Advanced Domain Customization</h3>
              
              <h4>Adding Context-Specific Recognition</h4>
              <p>
                Improve accuracy with contextual hints:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Use context to improve recognition
recognizer.start({
    domain: 'healthcare_assistant',
    context: {
        // Current app section/feature
        currentScreen: 'medication_tracker',
        
        // Recently mentioned entities
        recentMedications: ['lisinopril', 'metformin', 'atorvastatin'],
        
        // User preferences/profile info
        userSpecialist: 'cardiologist'
    },
    onResult: (result) => {
        console.log('Recognition result:', result);
    }
});
                `}</code>
              </pre>

              <h4>Dynamic Domain Adaptation</h4>
              <p>
                Update your domain on-the-fly:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Add new terms dynamically
ServiqAI.addDynamicTerms('healthcare_assistant', [
    'new_medication_name',
    'new_procedure_name'
]);

// Add user-specific terms
function addPatientMedications(patientMeds) {
    ServiqAI.addDynamicTerms('healthcare_assistant', patientMeds);
}

// Add new phrases with weights
ServiqAI.addDynamicPhrases('healthcare_assistant', [
    { text: 'check my glucose levels', weight: 1.5 },
    { text: 'log my insulin dose', weight: 1.4 }
]);
                `}</code>
              </pre>

              <h4>Multi-Domain Recognition</h4>
              <p>
                Use multiple domains simultaneously for complex applications:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`
// Configure multiple domains
recognizer.start({
    domains: [
        'healthcare_assistant', // Primary domain
        'general',              // Fallback for general queries
        'appointment_scheduler' // Another specialized domain
    ],
    domainWeights: [1.5, 1.0, 1.2], // Optional weights
    onResult: (result) => {
        console.log('Recognition result:', result);
        console.log('Matched domain:', result.domain);
    }
});
                `}</code>
              </pre>

              <h3>Best Practices</h3>
              <ul>
                <li><strong>Start Small</strong> - Begin with a core set of terms and phrases, then expand</li>
                <li><strong>Real-World Examples</strong> - Use actual examples from your users when possible</li>
                <li><strong>Regular Updates</strong> - Keep your domain current with new terminology</li>
                <li><strong>Use Weights Carefully</strong> - Higher weights bias recognition toward those phrases</li>
                <li><strong>Complementary Domains</strong> - For complex apps, create multiple specialized domains</li>
                <li><strong>Test with Various Speakers</strong> - Ensure your domain works well across different accents and speech patterns</li>
              </ul>
            </div>

            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-xl mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/developers/documentation/performance-optimization">Performance Optimization →</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/developers/documentation/security-best-practices">Security Best Practices →</Link>
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

export default CustomDomainCreation;
