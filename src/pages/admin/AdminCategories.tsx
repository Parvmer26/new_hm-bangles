import { useState } from "react";
import { useAdminCategories, useSaveCategory } from "@/hooks/useAdminProducts";
import { Plus, Pencil } from "lucide-react";

const AdminCategories = () => {
  const { data: categories, isLoading } = useAdminCategories();
  const saveCategory = useSaveCategory();
  const [showForm, setShowForm] = useState(false);
  const [editCat, setEditCat] = useState<any>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", is_active: true, sort_order: 0 });

  const openNew = () => { setEditCat(null); setForm({ name: "", slug: "", description: "", is_active: true, sort_order: 0 }); setShowForm(true); };
  const openEdit = (cat: any) => { setEditCat(cat); setForm({ name: cat.name, slug: cat.slug, description: cat.description || "", is_active: cat.is_active, sort_order: cat.sort_order }); setShowForm(true); };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveCategory.mutateAsync({ id: editCat?.id, ...form });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg">Categories</h2>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") }))} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" rows={2} />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border rounded-md text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border"><th className="p-4 text-left text-muted-foreground">Name</th><th className="p-4 text-left text-muted-foreground">Slug</th><th className="p-4 text-left text-muted-foreground">Status</th><th className="p-4 text-left text-muted-foreground">Actions</th></tr></thead>
          <tbody>
            {categories?.map((cat) => (
              <tr key={cat.id} className="border-b border-border/50">
                <td className="p-4 font-medium">{cat.name}</td>
                <td className="p-4 text-muted-foreground">{cat.slug}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${cat.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{cat.is_active ? "Active" : "Inactive"}</span></td>
                <td className="p-4"><button onClick={() => openEdit(cat)} className="p-1.5 hover:bg-secondary rounded"><Pencil className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p className="text-center py-8 text-muted-foreground">Loading...</p>}
        {!isLoading && categories?.length === 0 && <p className="text-center py-8 text-muted-foreground">No categories yet.</p>}
      </div>
    </div>
  );
};

export default AdminCategories;
