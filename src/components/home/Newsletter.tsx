import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-20 lg:py-28 luxury-gradient">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/80 mb-4 font-medium">
            Stay Connected
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-primary-foreground mb-4">
            Join the HM Family
          </h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
            Be the first to know about new collections, exclusive offers, and bangle care tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-sm text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:border-primary-foreground/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium rounded-sm hover:bg-foreground/90 transition-colors"
            >
              Subscribe
              <Send className="w-4 h-4" />
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Newsletter;
