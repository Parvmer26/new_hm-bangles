import ScrollReveal from "@/components/ScrollReveal";
import parallaxBg from "@/assets/parallax-bg.jpg";

const ParallaxCTA = () => {
  return (
    <section
      className="relative py-32 lg:py-40 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${parallaxBg})` }}
    >
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative container mx-auto px-4 lg:px-8 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold-light mb-4 font-medium">
            Limited Time Offer
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-primary-foreground mb-6">
            Up to 30% Off<br />
            <span className="italic font-semibold">Bestsellers</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
            Explore our most loved pieces at exclusive prices. Offer ends soon.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all rounded-sm"
          >
            Shop the Sale
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ParallaxCTA;
