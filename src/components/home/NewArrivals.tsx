import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";

const NewArrivals = () => {
  const newArrivals = sampleProducts.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="section-subheading mb-3">Just Landed</p>
            <h2 className="section-heading">New Arrivals</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {newArrivals.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
