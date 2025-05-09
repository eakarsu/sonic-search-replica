
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="wave-bg absolute inset-0 w-[200%] h-full -z-10 animate-wave"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Voice AI that Understands Like Humans Do
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Transform how users interact with your products through cutting-edge voice recognition, natural language understanding, and conversational AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-soundblue-500 hover:bg-gray-100">
              Try Demo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Documentation
            </Button>
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-lg">
                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-soundblue-500 ml-1"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {["Mercedes-Benz", "Hyundai", "Honda", "Pandora"].map((brand) => (
            <div key={brand} className="flex items-center justify-center">
              <span className="text-white font-bold opacity-70 text-xl">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
