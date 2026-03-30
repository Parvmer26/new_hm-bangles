import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedCollection = () => {
  const featured = sampleProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="section-subheading mb-3">Curated for You</p>
            <h2 className="section-heading">Featured Collection</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium text-foreground hover:text-primary transition-colors group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedCollection;
