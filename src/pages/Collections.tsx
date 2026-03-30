import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import categoryModern from "@/assets/category-modern.jpg";
import categoryTraditional from "@/assets/category-traditional.jpg";
import categoryPremium from "@/assets/category-premium.jpg";
import featuredBangles from "@/assets/featured-bangles.jpg";

const collections = [
  { name: "Traditional", image: categoryTraditional, slug: "traditional", desc: "Timeless designs rooted in heritage craftsmanship", count: 32 },
  { name: "Modern", image: categoryModern, slug: "modern", desc: "Contemporary elegance for the modern woman", count: 24 },
  { name: "Premium", image: categoryPremium, slug: "premium", desc: "Exquisite luxury pieces for special occasions", count: 18 },
  { name: "Bridal", image: featuredBangles, slug: "bridal", desc: "Perfect bangles for your special day", count: 15 },
];

const Collections = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subheading mb-3">Explore</p>
              <h1 className="section-heading">Our Collections</h1>
              <p className="text-muted-foreground max-w-lg mx-auto mt-4">
                Each collection is thoughtfully curated to bring you the finest bangles for every occasion.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {collections.map((col, i) => (
              <ScrollReveal key={col.slug} delay={i * 0.1}>
                <Link
                  to={`/shop?category=${col.slug}`}
                  className="group relative block overflow-hidden rounded-lg aspect-[4/3]"
                >
                  <img
                    src={col.image}
                    alt={`${col.name} collection`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70 mb-1">
                      {col.count} Pieces
                    </p>
                    <h3 className="font-heading text-3xl font-light text-primary-foreground mb-2">{col.name}</h3>
                    <p className="text-sm text-primary-foreground/80">{col.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
