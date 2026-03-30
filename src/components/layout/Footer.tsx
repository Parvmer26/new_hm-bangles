import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-3xl font-semibold">
              <span className="luxury-text-gradient">HM</span> Bangles
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Crafting timeless elegance since 2020. Every bangle tells a story of heritage, artistry, and love.
            </p>
            <div className="flex gap-3 pt-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-full border border-primary-foreground/20 hover:bg-primary hover:border-primary transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/shop", label: "Shop All" },
                { to: "/collections", label: "Collections" },
                { to: "/about", label: "Our Story" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold">Customer Service</h4>
            <div className="flex flex-col gap-2.5">
              {["Shipping & Returns", "Size Guide", "FAQ", "Privacy Policy", "Terms of Service"].map((item) => (
                <a key={item} href="#" className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                hello@hmbangles.com
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                +91 98765 43210
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Mumbai, Maharashtra, India
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} HM Bangles. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-primary-foreground/50">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
