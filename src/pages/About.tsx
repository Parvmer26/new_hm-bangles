import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import brandStory from "@/assets/brand-story.jpg";
import featuredBangles from "@/assets/featured-bangles.jpg";
import { Heart, Gem, Users, Award } from "lucide-react";

const stats = [
  { icon: Heart, value: "10,000+", label: "Happy Customers" },
  { icon: Gem, value: "500+", label: "Unique Designs" },
  { icon: Users, value: "50+", label: "Artisans" },
  { icon: Award, value: "5+", label: "Years of Craft" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="container mx-auto px-4 lg:px-8 mb-20">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className="section-subheading mb-3">Our Story</p>
              <h1 className="section-heading mb-6">
                Where Heritage Meets<br />
                <span className="italic">Modern Elegance</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                HM Bangles was born from a deep reverence for Indian jewelry traditions and a desire
                to bring them into the modern world. We craft each piece with meticulous attention
                to detail, ensuring that every bangle carries the warmth of handmade artistry.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Image + Text */}
        <div className="container mx-auto px-4 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <img src={brandStory} alt="Artisan at work" loading="lazy" className="w-full rounded-lg shadow-2xl" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl font-medium text-foreground">
                  Crafted with Passion,<br />Worn with Pride
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our journey began in the vibrant markets of India, where we witnessed the
                  incredible skill of traditional bangle artisans. Inspired by their dedication,
                  we set out to create a brand that honors their craft while making it accessible
                  to the modern woman.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every HM Bangles piece goes through a rigorous quality process. From sourcing
                  the finest materials to the final polish, we ensure that each bangle meets our
                  exacting standards of beauty and durability.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-secondary/50 py-16 mb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <ScrollReveal key={label} delay={i * 0.1}>
                  <div className="text-center">
                    <Icon className="w-8 h-8 mx-auto text-primary mb-3" />
                    <p className="font-heading text-3xl font-semibold text-foreground mb-1">{value}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">{label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subheading mb-3">What We Stand For</p>
              <h2 className="section-heading">Our Values</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Artisan Craftsmanship", desc: "Every piece is handcrafted by skilled artisans who pour their expertise and love into each creation." },
              { title: "Quality Materials", desc: "We use only the finest materials, ensuring each bangle is beautiful, durable, and skin-friendly." },
              { title: "Customer First", desc: "Your satisfaction is our priority. From browsing to unboxing, we create delightful experiences." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="glass-card rounded-lg p-8 text-center h-full">
                  <h3 className="font-heading text-xl font-medium text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
