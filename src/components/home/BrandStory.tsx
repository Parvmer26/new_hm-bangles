import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import brandStory from "@/assets/brand-story.jpg";

const BrandStory = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <img
                src={brandStory}
                alt="Artisan crafting bangles"
                loading="lazy"
                width={1200}
                height={800}
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-6">
              <p className="section-subheading">Our Story</p>
              <h2 className="section-heading">
                Crafting Beauty,<br />
                <span className="italic">One Bangle at a Time</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Born from a deep passion for traditional Indian artistry, HM Bangles brings you handcrafted
                pieces that honor age-old techniques while embracing modern aesthetics. Each bangle in our
                collection is a testament to the skill and dedication of our master artisans.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that jewelry is more than adornment — it's a celebration of identity, heritage,
                and the moments that matter most.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-sm uppercase tracking-[0.2em] font-medium text-primary hover:text-accent transition-colors border-b border-primary pb-0.5"
              >
                Read More About Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
