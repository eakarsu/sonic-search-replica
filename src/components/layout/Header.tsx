import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Products",
    href: "/products",
    children: [
      {
        title: "Voice AI",
        href: "/products/voice-ai",
        description: "Advanced voice recognition and assistant technology."
      },
      {
        title: "Voice Chat",
        href: "/products/voice-chat",
        description: "Conversational voice interfaces for your applications."
      },
      {
        title: "Voice Search",
        href: "/products/voice-search",
        description: "Intelligent search powered by voice commands."
      },
      {
        title: "Houndify",
        href: "/products/houndify",
        description: "Voice AI platform for developers."
      },
    ]
  },
  {
    title: "Solutions",
    href: "/solutions",
    children: [
      {
        title: "Automotive",
        href: "/solutions/automotive",
        description: "Voice AI for next-generation vehicles."
      },
      {
        title: "IoT & Smart Home",
        href: "/solutions/iot-smart-home",
        description: "Connect and control all your smart devices."
      },
      {
        title: "Mobile Apps",
        href: "/solutions#mobile-apps",
        description: "Enhance mobile experiences with voice technology."
      },
      {
        title: "Customer Service",
        href: "/solutions#customer-service",
        description: "Automated support with natural conversations."
      },
    ]
  },
  {
    title: "Developers",
    href: "/developers",
    children: [
      {
        title: "Documentation",
        href: "/developers/documentation",
        description: "Comprehensive guides and API references."
      },
      {
        title: "SDKs",
        href: "/developers#sdks",
        description: "Development kits for multiple platforms."
      },
      {
        title: "API Access",
        href: "/developers#api-access",
        description: "Integrate our technology into your applications."
      },
      {
        title: "Community",
        href: "/developers#community",
        description: "Join our developer community and forums."
      },
    ]
  },
  {
    title: "About",
    href: "/about",
    children: [
      {
        title: "Company",
        href: "/company/about-us",
        description: "Learn about our mission and vision."
      },
      {
        title: "Careers",
        href: "/about#careers",
        description: "Join our team of innovators."
      },
      {
        title: "News",
        href: "/about#news",
        description: "Latest updates and press releases."
      },
      {
        title: "Contact",
        href: "/about#contact",
        description: "Get in touch with our team."
      },
    ]
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <div className="gradient-primary text-white text-2xl font-bold rounded-lg px-3 py-1">
              VoiceWave
            </div>
          </Link>
          
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{child.title}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {child.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/get-started">
              <Button className="gradient-primary">Get Started</Button>
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="gradient-primary text-white text-2xl font-bold rounded-lg px-3 py-1">
                  VoiceWave
                </div>
              </Link>
              <button
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => (
                    <div key={item.title}>
                      <Link
                        to={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.children && (
                        <div className="ml-6 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              to={child.href}
                              className="block rounded-lg py-2 pl-3 pr-3 text-sm leading-7 text-gray-600 hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="gradient-primary w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
