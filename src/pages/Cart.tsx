import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, count } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="section-heading text-center mb-12">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="font-heading text-2xl text-foreground mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Discover our beautiful collection of bangles</p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium rounded-sm hover:bg-foreground/90 transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Items */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence>
                  {items.map((item) => {
                    const price = item.product.discountPrice ?? item.product.price;
                    return (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        layout
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 lg:gap-6 p-4 bg-card rounded-lg border border-border"
                      >
                        <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.name}
                            className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-md"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link to={`/product/${item.product.slug}`} className="font-heading text-lg font-medium text-foreground hover:text-primary transition-colors">
                                {item.product.name}
                              </Link>
                              <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-end justify-between mt-4">
                            <div className="inline-flex items-center border border-border rounded-sm">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                                className="p-2 hover:bg-secondary transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                                className="p-2 hover:bg-secondary transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="font-heading text-lg font-semibold text-foreground">
                              ₹{(price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-lg p-6 sticky top-24 space-y-4">
                  <h3 className="font-heading text-xl font-medium text-foreground">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({count} items)</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{total >= 2000 ? "Free" : "₹99"}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-heading text-xl font-semibold text-foreground">
                      ₹{(total + (total >= 2000 ? 0 : 99)).toLocaleString()}
                    </span>
                  </div>
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium rounded-sm hover:bg-foreground/90 transition-all"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="w-full inline-flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
