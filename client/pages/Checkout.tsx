import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Country, State, City } from "country-state-city";
import { settingsStore } from "@/lib/appSettings";
import { buildInvoicePdf } from "@/lib/invoicePdf";
import { notifications } from "@/lib/notifications";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, updateQty, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", country: "IN", state: "", city: "", pincode: "" });
  const [submitting, setSubmitting] = useState(false);

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(() => (form.country ? State.getStatesOfCountry(form.country) : []), [form.country]);
  const cities = useMemo(() => (form.country && form.state ? City.getCitiesOfState(form.country, form.state) : []), [form.country, form.state]);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const placeOrder = () => {
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    if (!form.name || !form.phone || !form.address) { toast.error("Please fill name, phone & address"); return; }

    setSubmitting(true);
    const pdfCfg = settingsStore.getPdf();
    const invoiceNo = `${pdfCfg.invoicePrefix || "INV"}-${Date.now().toString().slice(-6)}`;
    const countryName = countries.find((c) => c.isoCode === form.country)?.name || "";
    const stateName = states.find((s) => s.isoCode === form.state)?.name || "";

    const doc = buildInvoicePdf(pdfCfg, {
      invoiceNo,
      date: new Date().toLocaleDateString("en-GB"),
      customer: { name: form.name, phone: form.phone, email: form.email, address: form.address, city: form.city, state: stateName, country: countryName, pincode: form.pincode },
      dropLocation: [form.name, form.city].filter(Boolean).join(", "),
      items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price, unit: "-" })),
      total,
      tax: 0,
    });

    doc.save(`${invoiceNo}.pdf`);
    notifications.push({ type: "order", title: `New Order · ${invoiceNo}`, message: `${form.name} placed an order of ₹${total}`, meta: { invoiceNo, total, customer: form.name } });
    toast.success("Order placed! Invoice downloaded 🎆");
    clear();
    setSubmitting(false);
    navigate("/");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition bg-white";
  const labelClass = "text-sm font-semibold text-gray-700 mb-1.5 block";

  return (
    <Layout>
      <div className="pt-24 pb-20 px-4 md:px-8 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="text-primary font-semibold text-sm mb-1">Your Order</div>
            <h1 className="font-display font-black text-5xl text-gray-900">
              Checkout
            </h1>
            <p className="text-gray-500 mt-2">Enter your details and place the order</p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Customer Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 md:p-8 space-y-5 h-fit"
            >
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">Customer Details</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="9876543210" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Address *</label>
                <textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="House no, street, area" rows={3} className={`${inputClass} resize-none`} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Country</label>
                  <Select value={form.country} onValueChange={(v) => setForm((f) => ({ ...f, country: v, state: "", city: "" }))}>
                    <SelectTrigger className="rounded-xl border-gray-200 h-11"><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      {countries.map((c) => <SelectItem key={c.isoCode} value={c.isoCode}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <Select value={form.state} onValueChange={(v) => setForm((f) => ({ ...f, state: v, city: "" }))} disabled={!states.length}>
                    <SelectTrigger className="rounded-xl border-gray-200 h-11"><SelectValue placeholder={states.length ? "Select state" : "No states"} /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      {states.map((s) => <SelectItem key={s.isoCode} value={s.isoCode}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  {cities.length > 0 ? (
                    <Select value={form.city} onValueChange={(v) => update("city", v)}>
                      <SelectTrigger className="rounded-xl border-gray-200 h-11"><SelectValue placeholder="Select city" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {cities.map((ci) => <SelectItem key={`${ci.name}-${ci.latitude}`} value={ci.name}>{ci.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  ) : (
                    <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className={inputClass} />
                  )}
                </div>
                <div>
                  <label className={labelClass}>Pincode</label>
                  <input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="600001" className={inputClass} />
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 h-fit lg:sticky lg:top-24"
            >
              <h2 className="font-display font-bold text-lg text-gray-900 flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 grid place-items-center">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </div>
                Order Summary
              </h2>

              {items.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 mb-4">
                  {items.map((i) => (
                    <div key={i.id} className="flex gap-3 items-center bg-gray-50 rounded-2xl p-3">
                      <div className="w-14 h-14 rounded-xl bg-white grid place-items-center shrink-0 border border-gray-100">
                        <img src={i.image} alt={i.name} className="w-12 h-12 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-gray-900 truncate">{i.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">₹{i.price} each</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button onClick={() => updateQty(i.id, i.qty - 1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 grid place-items-center hover:border-primary hover:text-primary transition">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-5 text-center text-gray-900">{i.qty}</span>
                          <button onClick={() => updateQty(i.id, i.qty + 1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 grid place-items-center hover:border-primary hover:text-primary transition">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-primary">₹{i.price * i.qty}</div>
                        <button onClick={() => remove(i.id)} className="mt-2 w-6 h-6 rounded-lg grid place-items-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span><span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span><span className="text-green-500 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-black text-lg pt-2 border-t border-gray-100">
                  <span className="text-gray-900">Total</span>
                  <span className="text-primary font-display text-2xl">₹{total}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={submitting || items.length === 0}
                className="w-full mt-5 py-4 bg-gradient-to-r from-primary to-orange-400 text-white font-bold rounded-2xl shadow-[0_8px_24px_rgba(249,115,22,0.4)] hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing…
                  </span>
                ) : (
                  "Place Order & Download PDF 🎆"
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
