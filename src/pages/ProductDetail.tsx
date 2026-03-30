import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sampleProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { ShoppingBag, Heart, ChevronRight, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: dbProduct, isLoading } = useProduct(slug);
  const { data: allProducts } = useProducts();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Use DB product if available, fallback to sample data
  const sampleProduct = sampleProducts.find((p) => p.slug === slug);
  
  const product = dbProduct ? {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    description: dbProduct.description || "",
    price: dbProduct.price,
    discountPrice: dbProduct.discount_price,
    images: dbProduct.images.length > 0 ? dbProduct.images.map(img => img.image_url) : ["/placeholder.svg"],
    sizes: dbProduct.sizes.map(s => s.name),
    category: dbProduct.category?.name || "",
    collection: dbProduct.collection || "",
    material: dbProduct.material || "",
    color: dbProduct.color || "",
    sku: dbProduct.sku,
  } : sampleProduct ? {
    id: sampleProduct.id,
    name: sampleProduct.name,
    slug: sampleProduct.slug,
    description: sampleProduct.description,
    price: sampleProduct.price,
    discountPrice: sampleProduct.discountPrice,
    images: sampleProduct.images,
    sizes: sampleProduct.sizes,
    category: sampleProduct.category,
    collection: sampleProduct.collection,
    material: sampleProduct.material,
    color: sampleProduct.color,
    sku: sampleProduct.sku,
  } : null;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="section-heading mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  
  // Related products from DB or sample
  const related = allProducts
    ? allProducts.filter((p) => p.category?.name === product.category && p.id !== product.id).slice(0, 4).map(p => ({
        id: p.id, name: p.name, slug: p.slug, price: p.price, discountPrice: p.discount_price,
        images: p.images.map(img => img.image_url), category: p.category?.name || "",
        collection: p.collection || "", sizes: p.sizes.map(s => s.name),
        description: p.description || "", material: p.material || "", color: p.color || "",
        sku: p.sku, weight: p.weight || "", isNew: p.is_new_arrival, isFeatured: p.is_featured,
      }))
    : sampleProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    // Pass a compatible product object to addToCart
    const cartProduct = sampleProducts.find(p => p.id === product.id) || {
      ...sampleProducts[0],
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice || undefined,
      images: product.images,
      sizes: product.sizes,
    };
    addToCart(cartProduct, selectedSize, quantity);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="relative overflow-hidden rounded-lg aspect-square bg-card mb-4">
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                {hasDiscount && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] uppercase tracking-widest font-medium bg-accent text-accent-foreground rounded-sm">
                    {Math.round(((product.price - (product.discountPrice ?? product.price)) / product.price) * 100)}% Off
                  </span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-transparent"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {product.category} • {product.collection}
                </p>
                <h1 className="font-heading text-3xl lg:text-4xl font-medium text-foreground mb-4">{product.name}</h1>
                <div className="flex items-baseline gap-3">
                  {hasDiscount ? (
                    <>
                      <span className="text-3xl font-heading font-semibold text-primary">₹{product.discountPrice?.toLocaleString()}</span>
                      <span className="text-xl text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-heading font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Material</span>
                  <span className="text-foreground font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Color</span>
                  <span className="text-foreground font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="text-foreground font-medium">{product.sku}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-sm rounded-sm border transition-all ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}>
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && <p className="text-xs text-primary mt-2">Please select a size</p>}
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
                <div className="inline-flex items-center border border-border rounded-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="px-5 py-3 text-sm font-medium min-w-[50px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleAddToCart} disabled={!selectedSize}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium rounded-sm hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button className="p-4 border border-border rounded-sm hover:bg-secondary transition-colors"><Heart className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                {[
                  { icon: Truck, label: "Free Shipping", sub: "Orders above ₹2,000" },
                  { icon: Shield, label: "Secure Payment", sub: "100% protected" },
                  { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 mx-auto text-primary mb-1.5" />
                    <p className="text-xs font-medium text-foreground">{label}</p>
                    <p className="text-[10px] text-muted-foreground">{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container mx-auto px-4 lg:px-8 mt-24">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="section-subheading mb-3">You May Also Like</p>
                <h2 className="section-heading">Related Bangles</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <ProductCard product={p as any} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
