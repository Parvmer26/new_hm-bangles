import { useState } from "react";
import { useAdminSizes, useSaveSize } from "@/hooks/useAdminProducts";
import { Plus, Pencil } from "lucide-react";

const AdminSizes = () => {
  const { data: sizes, isLoading } = useAdminSizes();
  const saveSize = useSaveSize();
  const [showForm, setShowForm] = useState(false);
  const [editSize, setEditSize] = useState<any>(null);
  const [form, setForm] = useState({ name: "", sort_order: 0, is_active: true });

  const openNew = () => { setEditSize(null); setForm({ name: "", sort_order: 0, is_active: true }); setShowForm(true); };
  const openEdit = (size: any) => { setEditSize(size); setForm({ name: size.name, sort_order: size.sort_order, is_active: size.is_active }); setShowForm(true); };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveSize.mutateAsync({ id: editSize?.id, ...form });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg">Sizes</h2>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Size
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4 max-w-sm">
          <div>
            <label className="block text-sm font-medium mb-1">Size Name</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" placeholder="e.g. 2.4, 2.6, Free Size" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sort Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border rounded-md text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-card rounded-lg border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {sizes?.map((size) => (
            <div key={size.id} className="flex items-center justify-between p-4 border border-border rounded-md">
              <div>
                <p className="font-medium">{size.name}</p>
                <p className="text-xs text-muted-foreground">Order: {size.sort_order}</p>
              </div>
              <button onClick={() => openEdit(size)} className="p-1.5 hover:bg-secondary rounded"><Pencil className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        {isLoading && <p className="text-center py-8 text-muted-foreground">Loading...</p>}
        {!isLoading && sizes?.length === 0 && <p className="text-center py-8 text-muted-foreground">No sizes yet. Add your first bangle size!</p>}
      </div>
    </div>
  );
};

export default AdminSizes;
