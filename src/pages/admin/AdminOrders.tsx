import { useState } from "react";
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/useAdminProducts";
import { Search } from "lucide-react";

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const { data: orders, isLoading } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = orders?.filter((o) => {
    const matchesSearch = o.order_number.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-border bg-card text-sm">
          <option value="">All Status</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-4 text-muted-foreground font-medium">Order #</th>
              <th className="p-4 text-muted-foreground font-medium">Items</th>
              <th className="p-4 text-muted-foreground font-medium">Total</th>
              <th className="p-4 text-muted-foreground font-medium">Payment</th>
              <th className="p-4 text-muted-foreground font-medium">Status</th>
              <th className="p-4 text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered?.map((order) => (
              <tr key={order.id} className="border-b border-border/50">
                <td className="p-4 font-medium">{order.order_number}</td>
                <td className="p-4 text-muted-foreground">{order.order_items?.length || 0} items</td>
                <td className="p-4">₹{Number(order.total).toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${order.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                    {order.payment_status}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus.mutate({ id: order.id, status: e.target.value })}
                    className="px-2 py-1 rounded border border-border bg-background text-xs"
                  >
                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-4 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p className="text-center py-8 text-muted-foreground">Loading...</p>}
        {!isLoading && filtered?.length === 0 && <p className="text-center py-8 text-muted-foreground">No orders found.</p>}
      </div>
    </div>
  );
};

export default AdminOrders;
