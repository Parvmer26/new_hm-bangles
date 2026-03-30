import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subheading mb-3">Get in Touch</p>
              <h1 className="section-heading">Contact Us</h1>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <ScrollReveal direction="left">
              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email", value: "hello@hmbangles.com" },
                  { icon: Phone, title: "Phone", value: "+91 94272 71597" },
                  { icon: MapPin, title: "Address", value: "Rajkot, Gujarat, India" },
                ].map(({ icon: Icon, title, value }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal direction="right" className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card rounded-lg p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium rounded-sm hover:bg-foreground/90 transition-all"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
