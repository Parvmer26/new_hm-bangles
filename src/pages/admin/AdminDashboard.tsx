import { useAdminProducts, useAdminOrders } from "@/hooks/useAdminProducts";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { data: products } = useAdminProducts();
  const { data: orders } = useAdminOrders();

  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((sum, o) => sum + (o.payment_status === "paid" ? Number(o.total) : 0), 0) || 0;
  const pendingOrders = orders?.filter((o) => o.status === "pending").length || 0;

  const stats = [
    { label: "Total Products", value: totalProducts, icon: Package, color: "text-blue-500" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "text-green-500" },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
    { label: "Pending Orders", value: pendingOrders, icon: Users, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-heading font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading text-lg font-medium mb-4">Recent Orders</h3>
        {orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-muted-foreground font-medium">Order #</th>
                  <th className="pb-3 text-muted-foreground font-medium">Status</th>
                  <th className="pb-3 text-muted-foreground font-medium">Payment</th>
                  <th className="pb-3 text-muted-foreground font-medium">Total</th>
                  <th className="pb-3 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="py-3 font-medium">{order.order_number}</td>
                    <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-secondary">{order.status}</span></td>
                    <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs ${order.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{order.payment_status}</span></td>
                    <td className="py-3">₹{Number(order.total).toLocaleString()}</td>
                    <td className="py-3 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
