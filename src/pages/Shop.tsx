import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { sampleProducts, categories } from "@/data/products";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const { data: dbProducts } = useProducts();
  const { data: dbCategories } = useCategories();

  // Merge DB products with sample data as fallback
  const allProducts = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description || "",
        price: p.price,
        discountPrice: p.discount_price,
        images: p.images.length > 0 ? p.images.map((img) => img.image_url) : ["/placeholder.svg"],
        sizes: p.sizes.map((s) => s.name),
        category: p.category?.name || "",
        collection: p.collection || "",
        material: p.material || "",
        color: p.color || "",
        sku: p.sku,
        weight: p.weight || "",
        isNew: p.is_new_arrival,
        isNewArrival: p.is_new_arrival,
        isFeatured: p.is_featured,
        isActive: p.is_active,
      }));
    }
    return sampleProducts.filter((p) => p.isActive);
  }, [dbProducts]);

  const allCategories = useMemo(() => {
    if (dbCategories && dbCategories.length > 0) {
      return ["all", ...dbCategories.map((c) => c.name.toLowerCase())];
    }
    return ["all", ...categories.map((c) => c.name.toLowerCase())];
  }, [dbCategories]);

  const filteredProducts = useMemo(() => {
    let products = allProducts as any[];
    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category.toLowerCase() === selectedCategory);
    }
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
      case "price-high":
        return [...products].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
      case "newest":
        return [...products].sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      default:
        return [...products].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [allProducts, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          <ScrollReveal>
            <div className="text-center">
              <p className="section-subheading mb-3">Explore</p>
              <h1 className="section-heading mb-4">Our Collection</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discover handcrafted bangles that blend tradition with modern elegance.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="container mx-auto px-4 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-foreground text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-transparent border border-border rounded-sm px-3 py-2 text-foreground focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.05}>
                <ProductCard product={product as any} />
              </ScrollReveal>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
