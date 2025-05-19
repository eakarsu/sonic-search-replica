
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Solution {
  id: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
}

const solutions: Solution[] = [
  {
    id: "automotive",
    title: "Automotive Voice AI",
    description: "Transform the in-car experience with contextual voice commands, navigation, and entertainment control that works even without connectivity.",
    features: [
      "Offline navigation commands",
      "Multi-zone voice recognition",
      "Driver-specific personalization",
      "Ambient noise optimization",
      "OEM customization options"
    ],
    cta: "Explore Automotive"
  },
  {
    id: "smart-home",
    title: "Smart Home & IoT",
    description: "Create seamless smart home experiences with voice control for all connected devices, multi-room audio, and ambient computing.",
    features: [
      "Multi-device orchestration",
      "Room-aware contextual commands",
      "Energy usage optimization",
      "Custom wake words",
      "Privacy-focused processing"
    ],
    cta: "Discover Smart Home"
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    description: "Elevate your mobile apps with voice search, commands, and conversational interfaces that make mobile interactions faster and more intuitive.",
    features: [
      "Voice text messaging",
      "In-app voice navigation",
      "Voice-based authentication",
      "Low battery optimization",
      "Background processing"
    ],
    cta: "Learn About Mobile"
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    description: "Streamline customer service, internal operations, and data access with AI voice systems that understand your business context.",
    features: [
      "Custom domain training",
      "Multi-department support",
      "Compliance recording & analysis",
      "Business intelligence integration",
      "Seamless CRM connectivity"
    ],
    cta: "See Enterprise Solutions"
  }
];

const Solutions = () => {
  return (
    <section className="py-16 md:py-24" id="solutions">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry Solutions</h2>
          <p className="text-lg text-gray-600">
            Custom voice AI experiences optimized for different industries and use cases
          </p>
        </div>
        
        <Tabs defaultValue="automotive" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {solutions.map((solution) => (
              <TabsTrigger key={solution.id} value={solution.id}>
                {solution.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {solutions.map((solution) => (
            <TabsContent key={solution.id} value={solution.id}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                    <p className="text-gray-600">{solution.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="mr-3 mt-1 text-soundblue-500">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3337 4L6.00033 11.3333L2.66699 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="gradient-primary">{solution.cta}</Button>
                </div>
                
                <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                  <div className="text-lg text-gray-400">
                    {solution.id.charAt(0).toUpperCase() + solution.id.slice(1)} Illustration
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Solutions;
