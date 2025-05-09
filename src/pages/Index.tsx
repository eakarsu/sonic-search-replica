
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Solutions from "@/components/sections/Solutions";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main>
          <Hero />
          <Features />
          <Solutions />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Index;
