import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminCustomers = () => {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-lg">Customers</h2>
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-4 text-muted-foreground font-medium">Name</th>
              <th className="p-4 text-muted-foreground font-medium">Phone</th>
              <th className="p-4 text-muted-foreground font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((p) => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="p-4 font-medium">{p.full_name || "—"}</td>
                <td className="p-4 text-muted-foreground">{p.phone || "—"}</td>
                <td className="p-4 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p className="text-center py-8 text-muted-foreground">Loading...</p>}
        {!isLoading && profiles?.length === 0 && <p className="text-center py-8 text-muted-foreground">No customers yet.</p>}
      </div>
    </div>
  );
};

export default AdminCustomers;
