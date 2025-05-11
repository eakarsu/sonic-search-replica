
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-5xl mx-auto">
            <Link to="/products" className="text-soundblue-500 hover:underline mb-4 inline-block">
              ← Back to Products
            </Link>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-soundblue-500 mb-4">Pricing Plans</h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Choose the perfect plan for your voice AI needs. Scale as you grow with our flexible pricing options.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Basic Plan */}
              <div className="border rounded-xl p-6 flex flex-col h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Basic</h2>
                  <p className="text-gray-600 mb-4">Perfect for startups and individuals</p>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                  <Button className="w-full">Try Free for 14 Days</Button>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Up to 5,000 API requests/month</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>2 voice applications</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Basic voice commands</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Email support</span>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="border rounded-xl p-6 bg-soundblue-50 border-soundblue-200 flex flex-col h-full relative">
                <div className="absolute top-0 right-0 bg-soundblue-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Pro</h2>
                  <p className="text-gray-600 mb-4">Ideal for growing businesses</p>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                  <Button className="w-full gradient-primary">Get Started</Button>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Up to 50,000 API requests/month</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>10 voice applications</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Advanced voice commands</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Priority email and chat support</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Custom domain training</span>
                  </div>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="border rounded-xl p-6 flex flex-col h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
                  <p className="text-gray-600 mb-4">For large scale implementations</p>
                  <div className="flex items-end mb-4">
                    <span className="text-xl font-bold">Custom Pricing</span>
                  </div>
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Unlimited API requests</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Unlimited voice applications</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Advanced AI integration</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>SLA with 99.9% uptime</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Custom feature development</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">What happens after my trial expires?</h3>
                  <p className="text-gray-600">After your 14-day trial, you'll need to select a plan to continue using our services. Don't worry, we'll send you reminders before your trial ends.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Can I upgrade or downgrade my plan?</h3>
                  <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Upgrades are effective immediately, and downgrades take effect at the end of your billing cycle.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">How do API requests work?</h3>
                  <p className="text-gray-600">Each time your application sends a voice command to our servers for processing, it counts as one API request. Batch processing counts as multiple requests based on the number of items.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600">We accept all major credit cards, PayPal, and wire transfers for enterprise customers.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Need a custom solution?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team can build a tailored plan for your specific requirements. Contact our sales team to discuss your needs.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="gradient-primary">Contact Sales</Button>
                <Button variant="outline">Book a Demo</Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Pricing;
