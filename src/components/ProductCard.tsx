import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <motion.div
      className="group relative hover-lift"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <Link
  to={`/product/${product.slug}`}
  state={{ product }}
>
        <div className="relative overflow-hidden rounded-lg bg-card aspect-square">
          <img
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewArrival && (
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium bg-primary text-primary-foreground rounded-sm">
                New
              </span>
            )}
            {hasDiscount && (
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium bg-accent text-accent-foreground rounded-sm">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="font-heading text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem] leading-tight">
  {product.name}
</h3>
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-primary font-semibold">₹{product.discountPrice?.toLocaleString()}</span>
                <span className="text-muted-foreground line-through text-sm">₹{product.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-foreground font-semibold">₹{product.price.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
