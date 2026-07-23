import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, Column } from "@/components/admin/DataTable";
import { RowActions } from "@/components/admin/RowActions";
import { FormModal } from "@/components/admin/FormModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { TableFilters } from "@/components/admin/TableFilters";
import { useCrudModal } from "@/hooks/useCrudModal";
import { toast } from "sonner";
import { api } from "@/lib/api";

type Status = "Pending" | "Processing" | "Shipped" | "Delivered";
interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  total: number;
  status: Status;
  order_date: string;
  phone: string;
  address: string;
}

const statusVariants: Record<Status, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const modal = useCrudModal<Order>();
  const [editStatus, setEditStatus] = useState<Status>("Pending");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("__all__");
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const emptyOrderForm = { customer_name: "", phone: "", address: "", total: 0 };
  const [orderForm, setOrderForm] = useState(emptyOrderForm);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "__all__") params.set("status", statusFilter);
      const res = await api.get<{ data: Order[] }>(`/orders?${params.toString()}`);
      setOrders(res.data.map((o: any) => ({ ...o, total: Number(o.total) })));
    } catch (err: any) {
      toast.error(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [search, statusFilter]);

  const filtered = useMemo(() => orders, [orders]);

  const onEdit = (o: Order) => { setEditStatus(o.status); modal.openEdit(o); };
  const save = async () => {
    if (modal.item) {
      try {
        await api.put(`/orders/${modal.item.id}/status`, { status: editStatus });
        toast.success("Status updated");
        modal.close();
        load();
      } catch (err: any) {
        toast.error(err.message || "Update failed");
      }
    }
  };
  const onCreate = () => { setOrderForm(emptyOrderForm); setCreateOpen(true); };
  const saveNewOrder = async () => {
    if (!orderForm.customer_name.trim() || !orderForm.phone.trim()) {
      toast.error("Name and phone are required");
      return;
    }
    setCreating(true);
    try {
      await api.post("/orders", orderForm);
      toast.success("Order added");
      setCreateOpen(false);
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to add order");
    } finally {
      setCreating(false);
    }
  };
  const confirmDelete = async () => {
    if (modal.deleteItem) {
      try {
        await api.del(`/orders/${modal.deleteItem.id}`);
        toast.success("Order deleted");
        modal.closeDelete();
        load();
      } catch (err: any) {
        toast.error(err.message || "Delete failed");
      }
    }
  };

  const columns: Column<Order>[] = [
    { header: "Order ID", cell: (o) => <span className="font-mono">{o.order_number}</span> },
    { header: "Customer", cell: (o) => o.customer_name },
    { header: "Date", cell: (o) => o.order_date },
    { header: "Total", cell: (o) => `₹${o.total}` },
    { header: "Status", cell: (o) => <Badge className={statusVariants[o.status]}>{o.status}</Badge> },
    { header: "Actions", cell: (o) => <RowActions onView={() => modal.openView(o)} onEdit={() => onEdit(o)} onDelete={() => modal.openDelete(o)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="View and update order statuses"
        action={<Button onClick={onCreate}><Plus className="h-4 w-4" /> Add Order</Button>}
      />
      <TableFilters
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by order ID, customer, phone..."
        filters={[{
          label: "Status",
          value: "status",
          current: statusFilter,
          onChange: setStatusFilter,
          options: ["Pending", "Processing", "Shipped", "Delivered"].map(s => ({ label: s, value: s })),
        }]}
      />
      <DataTable columns={columns} data={filtered} rowKey={(o) => o.id} empty={loading ? "Loading..." : "No orders found"} />

      <FormModal
        open={modal.isOpen}
        onOpenChange={modal.setOpen}
        title={modal.mode === "view" ? `Order ${modal.item?.order_number}` : `Update ${modal.item?.order_number}`}
        onSubmit={save}
        readOnly={modal.mode === "view"}
      >
        {modal.item && (
          <div className="space-y-3">
            <div><Label>Customer</Label><p className="font-medium">{modal.item.customer_name}</p></div>
            <div><Label>Phone</Label><p>{modal.item.phone}</p></div>
            <div><Label>Address</Label><p>{modal.item.address}</p></div>
            <div><Label>Date</Label><p>{modal.item.order_date}</p></div>
            <div><Label>Total</Label><p className="text-lg font-bold">₹{modal.item.total}</p></div>
            <div>
              <Label>Status</Label>
              {modal.mode === "view" ? (
                <Badge className={statusVariants[modal.item.status]}>{modal.item.status}</Badge>
              ) : (
                <Select value={editStatus} onValueChange={(v) => setEditStatus(v as Status)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        )}
      </FormModal>

      <FormModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Add Order"
        onSubmit={saveNewOrder}
        submitText={creating ? "Saving..." : "Save"}
      >
        <div className="space-y-3">
          <div><Label>Customer Name</Label><Input value={orderForm.customer_name} onChange={(e) => setOrderForm({ ...orderForm, customer_name: e.target.value })} /></div>
          <div><Label>Phone</Label><Input value={orderForm.phone} onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })} /></div>
          <div><Label>Address</Label><Textarea value={orderForm.address} onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })} /></div>
          <div><Label>Total (₹)</Label><Input type="number" value={orderForm.total} onChange={(e) => setOrderForm({ ...orderForm, total: +e.target.value })} /></div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={modal.isDeleteOpen}
        onOpenChange={modal.setDeleteOpen}
        description={`Delete order ${modal.deleteItem?.order_number}?`}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
