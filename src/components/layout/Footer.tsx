
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Products",
    links: [
      { title: "Voice AI", href: "/products/voice-ai" },
      { title: "Voice Chat", href: "/products/voice-chat" },
      { title: "Voice Search", href: "/products/voice-search" },
      { title: "Houndify", href: "/products/houndify" },
      { title: "Pricing", href: "#pricing" },
    ]
  },
  {
    title: "Solutions",
    links: [
      { title: "Automotive", href: "/solutions/automotive" },
      { title: "IoT & Smart Home", href: "/solutions/iot-smart-home" },
      { title: "Mobile Apps", href: "/solutions/mobile-apps" },
      { title: "Customer Service", href: "/solutions/customer-service" },
      { title: "Enterprise", href: "/solutions/enterprise" },
    ]
  },
  {
    title: "Developers",
    links: [
      { title: "Documentation", href: "/developers/documentation" },
      { title: "SDKs", href: "/developers/documentation#sdks" },
      { title: "API Access", href: "/developers/api-access" },
      { title: "Community", href: "/developers/community" },
      { title: "Support", href: "/developers/support" },
    ]
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/company/about-us" },
      { title: "Careers", href: "/company/careers" },
      { title: "News", href: "/company/news" },
      { title: "Contact", href: "/company/contact" },
      { title: "Partners", href: "/company/partners" },
    ]
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="gradient-primary text-white text-2xl font-bold rounded-lg px-3 py-1">
                ServiqAI
              </div>
            </Link>
            <p className="text-gray-600 mb-6">
              Transforming how people interact with devices through advanced voice AI technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-soundblue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-soundblue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-soundblue-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-soundblue-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-soundblue-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link 
                      to={link.href} 
                      className="text-gray-600 hover:text-soundblue-500 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ServiqAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-soundblue-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-soundblue-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-soundblue-500 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
