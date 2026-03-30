import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import NewArrivals from "@/components/home/NewArrivals";
import ParallaxCTA from "@/components/home/ParallaxCTA";
import Testimonials from "@/components/home/Testimonials";
import BrandStory from "@/components/home/BrandStory";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCollection />
        <CategoryHighlights />
        <NewArrivals />
        <ParallaxCTA />
        <BrandStory />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
