import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductWithDetails {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  sku: string;
  product_code: string | null;
  price: number;
  discount_price: number | null;
  stock_quantity: number;
  availability_status: string;
  category_id: string | null;
  subcategory: string | null;
  collection: string | null;
  color: string | null;
  material: string | null;
  weight: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  is_active: boolean;
  created_at: string;
  images: { id: string; image_url: string; is_primary: boolean; sort_order: number }[];
  sizes: { id: string; name: string; stock: number }[];
  category: { id: string; name: string; slug: string } | null;
}

const fetchProducts = async (): Promise<ProductWithDetails[]> => {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(id, name, slug),
      images:product_images(id, image_url, is_primary, sort_order),
      product_sizes(id, stock, size:sizes(id, name))
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (products || []).map((p: any) => ({
    ...p,
    images: (p.images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
    sizes: (p.product_sizes || []).map((ps: any) => ({
      id: ps.size?.id,
      name: ps.size?.name,
      stock: ps.stock,
    })),
    category: p.category || null,
  }));
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(id, name, slug),
          images:product_images(id, image_url, is_primary, sort_order),
          product_sizes(id, stock, size:sizes(id, name))
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        images: (data.images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
        sizes: (data.product_sizes || []).map((ps: any) => ({
          id: ps.size?.id,
          name: ps.size?.name,
          stock: ps.stock,
        })),
        category: data.category || null,
      } as ProductWithDetails;
    },
    enabled: !!slug,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          images:product_images(id, image_url, is_primary, sort_order)
        `)
        .eq("is_active", true)
        .eq("is_featured", true)
        .limit(8);
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });
};
