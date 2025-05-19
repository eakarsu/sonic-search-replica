
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

const features: Feature[] = [
  {
    id: "voice-ai",
    title: "Advanced Voice AI",
    description: "Natural language processing that understands context, complex queries, and conversational speech in real-time.",
    badge: "Featured"
  },
  {
    id: "multilingual",
    title: "Multilingual Support",
    description: "Understand and process over 25 languages, with natural accents and dialects recognition.",
  },
  {
    id: "custom-domain",
    title: "Custom Domain Knowledge",
    description: "Train our AI with your specific industry terminology and knowledge base.",
  },
  {
    id: "voice-biometrics",
    title: "Voice Biometrics",
    description: "Secure authentication through unique voice patterns and signature recognition.",
  },
  {
    id: "noise-cancellation",
    title: "Noise Cancellation",
    description: "Clear voice recognition even in noisy environments with advanced audio processing.",
  },
  {
    id: "easy-integration",
    title: "Easy Integration",
    description: "Simple SDK implementation for web, mobile, automotive, and IoT platforms.",
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Voice AI Features</h2>
          <p className="text-lg text-gray-600">
            Our technology delivers unmatched accuracy and natural interactions across devices and platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-6">
                <div className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-soundblue-500 to-soundpurple-500 flex items-center justify-center text-white">
                      #{features.findIndex(f => f.id === feature.id) + 1}
                    </div>
                    {feature.badge && (
                      <Badge variant="secondary" className="bg-soundpurple-100 text-soundpurple-500 font-medium">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 flex-grow">{feature.description}</p>
                  
                  <a 
                    href={`#${feature.id}`}
                    className="inline-flex items-center mt-4 text-soundblue-500 font-medium hover:text-soundblue-700"
                  >
                    Learn more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
