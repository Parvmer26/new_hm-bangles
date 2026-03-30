import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import categoryModern from "@/assets/category-modern.jpg";
import categoryTraditional from "@/assets/category-traditional.jpg";
import categoryPremium from "@/assets/category-premium.jpg";

const categories = [
  { name: "Modern", image: categoryModern, slug: "modern", count: 24 },
  { name: "Traditional", image: categoryTraditional, slug: "traditional", count: 32 },
  { name: "Premium", image: categoryPremium, slug: "premium", count: 18 },
];

const CategoryHighlights = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="section-subheading mb-3">Browse by Style</p>
            <h2 className="section-heading">Our Collections</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.slug} delay={i * 0.15}>
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block overflow-hidden rounded-lg aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} bangles collection`}
                  loading="lazy"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70 mb-1">
                    {cat.count} Pieces
                  </p>
                  <h3 className="font-heading text-3xl lg:text-4xl font-light text-primary-foreground">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
