
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Users, Api } from "lucide-react";
import { Link } from "react-router-dom";

const Enterprise = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/solutions" className="text-soundblue-500 hover:underline mb-4 inline-block">
              ← Back to Solutions
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-soundblue-500" />
              <h1 className="text-4xl font-bold text-soundblue-500">Enterprise Solutions</h1>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Scale your business with secure, customizable voice AI solutions designed for 
              enterprise-grade deployment across your organization.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Enterprise Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Private Cloud Deployment</strong>
                    <p className="text-gray-600">Deploy in your own cloud environment or on-premises for enhanced security and compliance.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Enterprise-Grade Security</strong>
                    <p className="text-gray-600">SOC 2, HIPAA, and GDPR compliance with end-to-end encryption and data protection.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Custom Domain Integration</strong>
                    <p className="text-gray-600">Train our AI on your industry-specific terminology and proprietary knowledge.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Advanced Analytics</strong>
                    <p className="text-gray-600">Comprehensive usage metrics and performance insights across your organization.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Enterprise Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Internal Productivity</h3>
                  <p className="text-gray-600 mb-4">Voice-enabled tools for employee productivity, including meeting transcription, voice notes, and hands-free data entry.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Customer Engagement</h3>
                  <p className="text-gray-600 mb-4">Multi-channel voice interfaces for customer service, sales, and support at enterprise scale.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Data Analysis</h3>
                  <p className="text-gray-600 mb-4">Voice-activated business intelligence tools that provide instant insights from your company data.</p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Process Automation</h3>
                  <p className="text-gray-600 mb-4">Automate complex business processes with voice-triggered workflows and approvals.</p>
                </div>
              </div>
            </div>

            <div className="mb-8 bg-soundblue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Enterprise Support</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700">Dedicated account manager and technical support team</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700">99.99% SLA uptime guarantee with 24/7 monitoring</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700">Custom onboarding and implementation assistance</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700">Regular platform updates and feature enhancements</p>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Button className="gradient-primary mr-4">Contact Sales</Button>
              <Button variant="outline">Request Enterprise Demo</Button>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Enterprise;
