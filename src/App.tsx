
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Solutions from "./pages/Solutions";
import Developers from "./pages/Developers";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";

// Product pages
import VoiceAI from "./pages/products/VoiceAI";
import VoiceChat from "./pages/products/VoiceChat";
import VoiceSearch from "./pages/products/VoiceSearch";
import Houndify from "./pages/products/Houndify";

// Solution pages
import Automotive from "./pages/solutions/Automotive";
import IoTSmartHome from "./pages/solutions/IoTSmartHome";

// Developer pages
import Documentation from "./pages/developers/documentation";
import PlatformOverview from "./pages/developers/documentation/PlatformOverview";
import QuickStart from "./pages/developers/documentation/QuickStart";
import AccountSetup from "./pages/developers/documentation/AccountSetup";
import CoreConcepts from "./pages/developers/documentation/CoreConcepts";
import RestApiReference from "./pages/developers/documentation/RestApiReference";
import IosSdk from "./pages/developers/documentation/IosSdk";
import AndroidSdk from "./pages/developers/documentation/AndroidSdk";
import WebSdk from "./pages/developers/documentation/WebSdk";
import VoiceAssistantImplementation from "./pages/developers/documentation/VoiceAssistantImplementation";
import CustomDomainCreation from "./pages/developers/documentation/CustomDomainCreation";
import PerformanceOptimization from "./pages/developers/documentation/PerformanceOptimization";
import SecurityBestPractices from "./pages/developers/documentation/SecurityBestPractices";

// Company pages
import AboutUs from "./pages/company/AboutUs";
import Careers from "./pages/company/Careers";
import News from "./pages/company/News";
import Contact from "./pages/company/Contact";
import Partners from "./pages/company/Partners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/get-started" element={<GetStarted />} />
          
          {/* Product pages */}
          <Route path="/products/voice-ai" element={<VoiceAI />} />
          <Route path="/products/voice-chat" element={<VoiceChat />} />
          <Route path="/products/voice-search" element={<VoiceSearch />} />
          <Route path="/products/houndify" element={<Houndify />} />
          
          {/* Solution pages */}
          <Route path="/solutions/automotive" element={<Automotive />} />
          <Route path="/solutions/iot-smart-home" element={<IoTSmartHome />} />
          
          {/* Developer pages */}
          <Route path="/developers/documentation" element={<Documentation />} />
          <Route path="/developers/documentation/platform-overview" element={<PlatformOverview />} />
          <Route path="/developers/documentation/quick-start" element={<QuickStart />} />
          <Route path="/developers/documentation/account-setup" element={<AccountSetup />} />
          <Route path="/developers/documentation/core-concepts" element={<CoreConcepts />} />
          <Route path="/developers/documentation/rest-api-reference" element={<RestApiReference />} />
          <Route path="/developers/documentation/ios-sdk" element={<IosSdk />} />
          <Route path="/developers/documentation/android-sdk" element={<AndroidSdk />} />
          <Route path="/developers/documentation/web-sdk" element={<WebSdk />} />
          <Route path="/developers/documentation/voice-assistant-implementation" element={<VoiceAssistantImplementation />} />
          <Route path="/developers/documentation/custom-domain-creation" element={<CustomDomainCreation />} />
          <Route path="/developers/documentation/performance-optimization" element={<PerformanceOptimization />} />
          <Route path="/developers/documentation/security-best-practices" element={<SecurityBestPractices />} />
          
          {/* Company pages */}
          <Route path="/company/about-us" element={<AboutUs />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/company/news" element={<News />} />
          <Route path="/company/contact" element={<Contact />} />
          <Route path="/company/partners" element={<Partners />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
