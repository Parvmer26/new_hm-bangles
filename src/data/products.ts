import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sku: string;
  productCode: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  availability: "in_stock" | "out_of_stock" | "low_stock";
  images: string[];
  thumbnail: string;
  category: string;
  subcategory?: string;
  collection?: string;
  sizes: string[];
  color: string;
  material: string;
  weight: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestseller: boolean;
  isActive: boolean;
}

export const categories = [
  { id: "1", name: "Traditional", slug: "traditional", description: "Timeless designs rooted in heritage" },
  { id: "2", name: "Modern", slug: "modern", description: "Contemporary elegance for today" },
  { id: "3", name: "Premium", slug: "premium", description: "Exquisite luxury pieces" },
  { id: "4", name: "Bridal", slug: "bridal", description: "Perfect for your special day" },
];

export const sizes = ["2.2", "2.4", "2.6", "2.8", "2.10"];

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Golden Flora Bangle",
    slug: "golden-flora-bangle",
    description: "Exquisite handcrafted gold bangle featuring intricate floral filigree patterns. Each piece is meticulously designed by our master artisans, blending traditional craftsmanship with timeless elegance.",
    shortDescription: "Handcrafted floral filigree gold bangle",
    sku: "HMB-GF-001",
    productCode: "GF001",
    price: 4500,
    discountPrice: 3999,
    stockQuantity: 25,
    availability: "in_stock",
    images: [product1],
    thumbnail: product1,
    category: "Traditional",
    subcategory: "Filigree",
    collection: "Heritage Collection",
    sizes: ["2.2", "2.4", "2.6", "2.8"],
    color: "Gold",
    material: "22K Gold Plated Brass",
    weight: "45g",
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    isActive: true,
  },
  {
    id: "2",
    name: "Rose Trio Stackable Set",
    slug: "rose-trio-stackable-set",
    description: "A beautiful set of three slim rose gold bangles designed to be worn stacked together. Their minimalist design makes them perfect for everyday elegance.",
    shortDescription: "Set of 3 slim rose gold stackable bangles",
    sku: "HMB-RT-002",
    productCode: "RT002",
    price: 2800,
    stockQuantity: 40,
    availability: "in_stock",
    images: [product2],
    thumbnail: product2,
    category: "Modern",
    subcategory: "Stackable",
    collection: "Everyday Luxe",
    sizes: ["2.2", "2.4", "2.6"],
    color: "Rose Gold",
    material: "Rose Gold Plated Sterling Silver",
    weight: "28g",
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    isActive: true,
  },
  {
    id: "3",
    name: "Royal Navratna Bangle",
    slug: "royal-navratna-bangle",
    description: "A stunning traditional bangle adorned with nine precious colored stones set in ornate gold framework. Inspired by royal Mughal jewelry traditions.",
    shortDescription: "Nine-stone ornate gold bangle",
    sku: "HMB-RN-003",
    productCode: "RN003",
    price: 8500,
    discountPrice: 7499,
    stockQuantity: 10,
    availability: "low_stock",
    images: [product3],
    thumbnail: product3,
    category: "Premium",
    subcategory: "Kundan",
    collection: "Royal Heritage",
    sizes: ["2.4", "2.6", "2.8"],
    color: "Multi / Gold",
    material: "Gold Plated with Semi-Precious Stones",
    weight: "65g",
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    isActive: true,
  },
  {
    id: "4",
    name: "Hammered Gold Cuff",
    slug: "hammered-gold-cuff",
    description: "A bold, wide cuff bangle with a beautifully hammered texture. This statement piece combines modern design with artisanal craftsmanship.",
    shortDescription: "Wide hammered texture gold cuff bangle",
    sku: "HMB-HC-004",
    productCode: "HC004",
    price: 3200,
    stockQuantity: 30,
    availability: "in_stock",
    images: [product4],
    thumbnail: product4,
    category: "Modern",
    subcategory: "Cuff",
    collection: "Bold & Beautiful",
    sizes: ["2.4", "2.6", "2.8", "2.10"],
    color: "Gold",
    material: "Brass with 24K Gold Plating",
    weight: "52g",
    isFeatured: false,
    isNewArrival: true,
    isBestseller: false,
    isActive: true,
  },
  {
    id: "5",
    name: "Crystal Cascade Bangle",
    slug: "crystal-cascade-bangle",
    description: "A delicate gold bangle encrusted with sparkling crystals. The cascading stone pattern catches light beautifully, perfect for festive occasions.",
    shortDescription: "Crystal-encrusted sparkling gold bangle",
    sku: "HMB-CC-005",
    productCode: "CC005",
    price: 3800,
    discountPrice: 3299,
    stockQuantity: 18,
    availability: "in_stock",
    images: [product5],
    thumbnail: product5,
    category: "Premium",
    subcategory: "Crystal",
    collection: "Sparkle Series",
    sizes: ["2.2", "2.4", "2.6"],
    color: "Gold / Crystal",
    material: "Gold Plated with Swarovski Elements",
    weight: "38g",
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    isActive: true,
  },
  {
    id: "6",
    name: "Meenakari Heritage Set",
    slug: "meenakari-heritage-set",
    description: "A pair of vibrant enamel bangles featuring traditional meenakari artwork. Rich colors and intricate patterns make this a collector's treasure.",
    shortDescription: "Colorful meenakari enamel bangle pair",
    sku: "HMB-MH-006",
    productCode: "MH006",
    price: 5200,
    stockQuantity: 15,
    availability: "in_stock",
    images: [product6],
    thumbnail: product6,
    category: "Traditional",
    subcategory: "Meenakari",
    collection: "Heritage Collection",
    sizes: ["2.4", "2.6", "2.8"],
    color: "Multi / Gold",
    material: "Gold Plated with Enamel Work",
    weight: "55g",
    isFeatured: false,
    isNewArrival: false,
    isBestseller: true,
    isActive: true,
  },
];
