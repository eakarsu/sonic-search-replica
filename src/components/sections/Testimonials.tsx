
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "VoiceWave has revolutionized our in-car experience. Drivers can control everything with natural voice commands, even without internet connectivity.",
    author: "Sarah Johnson",
    role: "Chief Innovation Officer",
    company: "AutoTech Innovations"
  },
  {
    id: "t2",
    quote: "Implementing VoiceWave's API was remarkably simple, and the accuracy is unmatched. Our users love the natural conversation flow.",
    author: "Michael Chen",
    role: "VP of Product",
    company: "SmartLife Solutions"
  },
  {
    id: "t3",
    quote: "The multilingual capabilities have helped us expand globally. Our app now supports voice interactions in 25 languages with exceptional accuracy.",
    author: "Elena Rodriguez",
    role: "CTO",
    company: "GlobalConnect Inc."
  },
  {
    id: "t4",
    quote: "Our customer service efficiency improved by 65% after implementing VoiceWave's enterprise solution. The ROI has been incredible.",
    author: "Robert Keller",
    role: "Customer Experience Director",
    company: "Omnichannel Retail"
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">
            Industry leaders trust our voice AI technology to transform their customer experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-6">"{testimonial.quote}"</blockquote>
                
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
