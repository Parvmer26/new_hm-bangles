import { useState } from "react";
import { useAdminProducts, useDeleteProduct, useToggleProductActive, useSaveProduct, useAdminCategories, useAdminSizes } from "@/hooks/useAdminProducts";
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { toast } from "sonner";

const AdminProducts = () => {
  const { data: products, isLoading } = useAdminProducts();
  const { data: categories } = useAdminCategories();
  const { data: sizes } = useAdminSizes();
  const deleteProduct = useDeleteProduct();
  const toggleActive = useToggleProductActive();
  const saveProduct = useSaveProduct();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <ProductForm
        product={editProduct}
        categories={categories || []}
        sizes={sizes || []}
        onSave={async (data: any) => {
          await saveProduct.mutateAsync(data);
          setShowForm(false);
        }}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button onClick={handleNew} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-muted-foreground font-medium">Product</th>
                <th className="p-4 text-muted-foreground font-medium">SKU</th>
                <th className="p-4 text-muted-foreground font-medium">Price</th>
                <th className="p-4 text-muted-foreground font-medium">Stock</th>
                <th className="p-4 text-muted-foreground font-medium">Status</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((product) => (
                <tr key={product.id} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <img src={product.images[0].image_url} alt="" className="w-10 h-10 rounded object-cover" />
                      )}
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{(product.category as any)?.name || "No category"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.sku}</td>
                  <td className="p-4">
                    ₹{Number(product.price).toLocaleString()}
                    {product.discount_price && <span className="text-xs text-muted-foreground ml-1 line-through">₹{Number(product.discount_price).toLocaleString()}</span>}
                  </td>
                  <td className="p-4">{product.stock_quantity}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${product.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(product)} className="p-1.5 hover:bg-secondary rounded transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleActive.mutate({ id: product.id, is_active: !product.is_active })}
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                        title={product.is_active ? "Deactivate" : "Activate"}
                      >
                        {product.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => { if (confirm("Delete this product?")) deleteProduct.mutate(product.id); }}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered?.length === 0 && <p className="text-center py-8 text-muted-foreground">No products found.</p>}
        </div>
      )}
    </div>
  );
};

// Product Form Component
const ProductForm = ({ product, categories, sizes, onSave, onCancel }: any) => {
  const [form, setForm] = useState({
    id: product?.id || undefined,
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    short_description: product?.short_description || "",
    sku: product?.sku || "",
    product_code: product?.product_code || "",
    price: product?.price || "",
    discount_price: product?.discount_price || "",
    stock_quantity: product?.stock_quantity || 0,
    category_id: product?.category_id || "",
    collection: product?.collection || "",
    color: product?.color || "",
    material: product?.material || "",
    weight: product?.weight || "",
    is_featured: product?.is_featured || false,
    is_new_arrival: product?.is_new_arrival || false,
    is_bestseller: product?.is_bestseller || false,
    is_active: product?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.sku || !form.price) {
      toast.error("Name, slug, SKU, and price are required");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        ...form,
        price: parseFloat(form.price),
        discount_price: form.discount_price ? parseFloat(form.discount_price) : null,
        stock_quantity: parseInt(form.stock_quantity as any) || 0,
        category_id: form.category_id || null,
      });
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    setForm((f) => ({ ...f, slug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }));
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-medium">{product ? "Edit Product" : "Add Product"}</h2>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-lg border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input name="name" value={form.name} onChange={handleChange} onBlur={generateSlug} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input name="slug" value={form.slug} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input name="sku" value={form.sku} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product Code</label>
            <input name="product_code" value={form.product_code} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount Price</label>
            <input name="discount_price" type="number" step="0.01" value={form.discount_price} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock Quantity</label>
            <input name="stock_quantity" type="number" value={form.stock_quantity} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">No category</option>
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Material</label>
            <input name="material" value={form.material} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input name="color" value={form.color} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weight</label>
            <input name="weight" value={form.weight} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Collection</label>
            <input name="collection" value={form.collection} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <textarea name="short_description" rows={2} value={form.short_description} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>

        <div className="flex flex-wrap gap-6">
          {[
            { name: "is_featured", label: "Featured" },
            { name: "is_new_arrival", label: "New Arrival" },
            { name: "is_bestseller", label: "Bestseller" },
            { name: "is_active", label: "Active" },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name={name} checked={(form as any)[name]} onChange={handleChange} className="rounded border-border" />
              {label}
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Save Product"}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2 border border-border rounded-md text-sm hover:bg-secondary transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProducts;
