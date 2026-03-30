import ScrollReveal from "@/components/ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The craftsmanship is absolutely stunning. My wedding bangles from HM Bangles were the highlight of my bridal look. Every guest asked about them!",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    location: "Delhi",
    text: "I've been a loyal customer for 2 years. The quality is consistently excellent, and the customer service is top-notch. Highly recommended!",
    rating: 5,
  },
  {
    name: "Meera Reddy",
    location: "Bangalore",
    text: "Found the perfect everyday bangles here. The rose gold stackable set is my absolute favorite — elegant yet understated. Beautiful packaging too!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="section-subheading mb-3">What Our Customers Say</p>
            <h2 className="section-heading">Loved by Many</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="glass-card rounded-lg p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed flex-1 mb-6 text-sm">
                  "{t.text}"
                </p>
                <div>
                  <p className="font-heading text-lg font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.location}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
