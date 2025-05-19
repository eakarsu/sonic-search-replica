
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="cta">
      <div className="absolute inset-0 wave-bg opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="gradient-primary p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your voice experience?</h2>
              <p className="mb-6">
                Join thousands of businesses already using VoiceWave to create intelligent voice interactions.
              </p>
              <ul className="space-y-3 mb-8">
                {["Free 30-day trial", "No credit card required", "Full API access", "Technical support"].map((item) => (
                  <li key={item} className="flex items-start">
                    <div className="mr-3 mt-1">
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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 md:p-12">
              <h3 className="text-xl font-bold mb-6">Get started with VoiceWave</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    placeholder="Your company"
                    className="w-full"
                  />
                </div>
                
                <Button className="w-full gradient-primary">Start Free Trial</Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By signing up, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
