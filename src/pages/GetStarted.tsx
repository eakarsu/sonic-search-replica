
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle } from "lucide-react";

const GetStarted = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration attempt with:", { name, email, company });
    // Registration logic would go here
  };

  const features = [
    "Free 14-day trial with full access",
    "5,000 API calls per month",
    "Developer documentation access",
    "Community support"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Get Started with VoiceWave</h1>
                <p className="text-gray-600 mb-6">
                  Create your account to access our voice technology platform and start building voice-enabled applications.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block mb-1 text-sm font-medium text-gray-700">
                      Company (Optional)
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soundblue-500"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full gradient-primary">
                      Create Account
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-soundblue-500 hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Free Developer Plan</h2>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10">
                  <h3 className="font-semibold mb-3">Looking for enterprise solutions?</h3>
                  <p className="text-gray-600 mb-4">
                    Contact our sales team for custom pricing and features tailored to your business needs.
                  </p>
                  <Button variant="outline" className="border-soundblue-500 text-soundblue-500">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default GetStarted;
