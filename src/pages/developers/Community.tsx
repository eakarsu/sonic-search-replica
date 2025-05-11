
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-soundblue-500" />
              <h1 className="text-4xl font-bold text-soundblue-500">Developer Community</h1>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Connect with fellow developers, share knowledge, and get support for your voice AI projects.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Discussion Forums</h2>
                <p className="text-gray-700 mb-6">
                  Engage with our community of developers to discuss implementation challenges, share solutions,
                  and explore new use cases for ServiqAI technology.
                </p>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="font-medium mb-1">General Discussions</h3>
                    <p className="text-gray-600 text-sm">Discuss general topics related to voice AI development.</p>
                  </div>
                  <div className="border-b pb-3">
                    <h3 className="font-medium mb-1">Technical Support</h3>
                    <p className="text-gray-600 text-sm">Get help with implementation issues and bugs.</p>
                  </div>
                  <div className="border-b pb-3">
                    <h3 className="font-medium mb-1">Show & Tell</h3>
                    <p className="text-gray-600 text-sm">Share your projects built with ServiqAI technology.</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Feature Requests</h3>
                    <p className="text-gray-600 text-sm">Suggest and vote on new features for our platform.</p>
                  </div>
                </div>
                <Button className="w-full mt-6">Join the Forums</Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Discord Community</h2>
                <p className="text-gray-700 mb-6">
                  Join our Discord server for real-time discussions, quick problem solving, and to connect with
                  our engineering team and other voice AI developers.
                </p>
                <div className="bg-white rounded-lg p-4 mb-6 border">
                  <h3 className="font-medium mb-2">What you'll find on Discord</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">Live help from community experts</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">Regular office hours with our dev team</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">Hackathon announcements</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-soundblue-100 text-soundblue-600 rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">Beta feature access</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full gradient-primary">Join Discord</Button>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">Community Events</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6">
                  <div className="text-soundblue-500 font-medium mb-2">Monthly Webinars</div>
                  <p className="text-gray-700 mb-4">Learn from our engineers and guest speakers about best practices and advanced techniques.</p>
                  <Button variant="outline" size="sm" className="w-full">View Schedule</Button>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="text-soundblue-500 font-medium mb-2">Hackathons</div>
                  <p className="text-gray-700 mb-4">Participate in our community hackathons and showcase your voice AI innovations.</p>
                  <Button variant="outline" size="sm" className="w-full">Upcoming Hackathons</Button>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="text-soundblue-500 font-medium mb-2">Developer Meetups</div>
                  <p className="text-gray-700 mb-4">Join in-person and virtual meetups to network with other voice AI enthusiasts.</p>
                  <Button variant="outline" size="sm" className="w-full">Find Meetups</Button>
                </div>
              </div>
            </div>

            <div className="bg-soundblue-50 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-semibold mb-4">Community Highlights</h2>
              <p className="text-gray-700 mb-6">Check out these impressive projects built by community members using ServiqAI technology:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-medium mb-2">Voice-Enabled Smart Home Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-3">By Michael Chen</p>
                  <p className="text-gray-700 mb-3">
                    A comprehensive dashboard for controlling smart home devices using natural language commands.
                  </p>
                  <Button variant="link" className="p-0 h-auto">View Project</Button>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="font-medium mb-2">Multilingual Voice Assistant for Elderly Care</h3>
                  <p className="text-gray-600 text-sm mb-3">By Sarah Johnson</p>
                  <p className="text-gray-700 mb-3">
                    An assistive technology that helps elderly users with daily tasks and medication reminders.
                  </p>
                  <Button variant="link" className="p-0 h-auto">View Project</Button>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline">Submit Your Project</Button>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold mb-4">Join Our Growing Community</h2>
              <p className="text-gray-700 mb-6 max-w-2xl">
                Connect with over 50,000 developers who are building the future of voice-enabled applications.
                Share knowledge, get support, and collaborate on exciting projects.
              </p>
              <div className="flex gap-4">
                <Button className="gradient-primary">Join Discord</Button>
                <Button variant="outline">Visit Forums</Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Community;
