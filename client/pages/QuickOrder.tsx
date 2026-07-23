import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { products, type Category } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Search, Minus, Plus, ShoppingCart, Zap, Trash2 } from "lucide-react";
import { toast } from "sonner";

type CatFilter = "All" | Category;
const categories: CatFilter[] = ["All", "Rockets", "Sparklers", "Fountains", "Bombs"];
const sorts = ["Name", "Price: Low to High", "Price: High to Low"] as const;

/* Simple 3D shopping cart SVG illustration */
const CartIllustration = () => (
  <svg viewBox="0 0 320 280" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cartBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF7ED" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
    </defs>
    <rect width="320" height="280" fill="url(#cartBg)" rx="20" />

    {/* Shadow */}
    <ellipse cx="160" cy="258" rx="90" ry="12" fill="#F97316" opacity="0.15" />

    {/* Cart body */}
    <path d="M60 80 L80 200 L240 200 L260 80 Z" fill="#F97316" opacity="0.15" />
    <path d="M60 80 L80 200 L240 200 L260 80 Z" stroke="#F97316" strokeWidth="3" fill="none" />

    {/* Cart top bar */}
    <rect x="40" y="65" width="240" height="24" rx="12" fill="#F97316" />

    {/* Cart handle */}
    <path d="M80 65 Q80 30 120 30 L200 30 Q240 30 240 65" stroke="#F97316" strokeWidth="6" fill="none" strokeLinecap="round" />

    {/* Products in cart */}
    {/* Box 1 */}
    <rect x="90" y="110" width="45" height="45" rx="6" fill="#8B5CF6" />
    <rect x="90" y="110" width="45" height="12" rx="6" fill="#7C3AED" />
    <rect x="105" y="107" width="14" height="8" rx="4" fill="#FCD34D" />

    {/* Box 2 */}
    <rect x="145" y="120" width="40" height="40" rx="6" fill="#10B981" />
    <rect x="145" y="120" width="40" height="11" rx="6" fill="#059669" />
    <rect x="158" y="117" width="14" height="8" rx="4" fill="#FCD34D" />

    {/* Box 3 */}
    <rect x="195" y="115" width="35" height="35" rx="6" fill="#EF4444" />
    <rect x="195" y="115" width="35" height="10" rx="6" fill="#DC2626" />
    <rect x="206" y="112" width="12" height="7" rx="4" fill="#FCD34D" />

    {/* Sparkle stars */}
    <text x="50" y="55" fontSize="16" fill="#F97316" opacity="0.7">✦</text>
    <text x="265" y="75" fontSize="12" fill="#FCD34D">✦</text>
    <text x="155" y="38" fontSize="14" fill="#F97316" opacity="0.6">★</text>

    {/* Wheels */}
    <circle cx="110" cy="218" r="18" fill="#374151" />
    <circle cx="110" cy="218" r="10" fill="#6B7280" />
    <circle cx="110" cy="218" r="4" fill="#9CA3AF" />
    <circle cx="210" cy="218" r="18" fill="#374151" />
    <circle cx="210" cy="218" r="10" fill="#6B7280" />
    <circle cx="210" cy="218" r="4" fill="#9CA3AF" />

    {/* Label */}
    <rect x="95" y="238" width="130" height="26" rx="13" fill="#F97316" />
    <text x="160" y="256" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">QUICK ORDER</text>
  </svg>
);

const QuickOrder = () => {
  const [cat, setCat] = useState<CatFilter>("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Name");
  const [qty, setQty] = useState<Record<string, number>>({});
  const { add, setOpen } = useCart();

  const filtered = useMemo(() => {
    let r = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        p.price <= maxPrice
    );
    if (sort === "Price: Low to High") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "Name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [cat, search, maxPrice, sort]);

  const setQ = (id: string, v: number) =>
    setQty((prev) => ({ ...prev, [id]: Math.max(0, v) }));

  const totalItems = Object.values(qty).reduce((s, n) => s + n, 0);
  const totalAmount =
    products.reduce((s, p) => s + (qty[p.id] || 0) * p.price, 0);

  const addAllToCart = () => {
    let added = 0;
    Object.entries(qty).forEach(([id, n]) => {
      const p = products.find((x) => x.id === id);
      if (p && n > 0) {
        for (let i = 0; i < n; i++) add(p);
        added += n;
      }
    });
    if (added === 0) return toast.error("Add quantity to at least one product");
    toast.success(`Added ${added} item${added > 1 ? "s" : ""} to cart 🎆`);
    setQty({});
    setOpen(true);
  };

  return (
    <Layout>
      <section className="pt-24 pb-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
              <Zap className="w-4 h-4" /> Bulk Order
            </div>
            <h1 className="font-display font-black text-5xl md:text-6xl text-gray-900">
              Order Your Favorites{" "}
              <span className="text-gradient-festive block md:inline">in Just a Few Clicks</span>
            </h1>
            <p className="text-gray-500 mt-3 max-w-xl">
              Enter quantities for multiple products at once and add them all to your cart in one go.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Main table area */}
            <div>
              {/* Filters row */}
              <div className="flex flex-wrap gap-2 mb-5">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                      cat === c
                        ? "bg-primary text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)]"
                        : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <div className="ml-auto flex gap-2 items-center">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as any)}
                    className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-white outline-none focus:border-primary/60 transition text-gray-700"
                  >
                    {sorts.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Search + price */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products…"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition"
                  />
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 min-w-[180px]">
                  <span className="text-xs text-gray-500">Max ₹</span>
                  <input
                    type="range" min={50} max={2000} step={10} value={maxPrice}
                    onChange={(e) => setMaxPrice(+e.target.value)}
                    className="flex-1 accent-primary h-1.5"
                  />
                  <span className="text-sm font-bold text-primary whitespace-nowrap">{maxPrice}</span>
                </div>
              </div>

              {/* Table */}
              {filtered.length === 0 ? (
                <div className="bg-gray-50 rounded-3xl p-16 text-center text-gray-400">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="font-semibold">No products match your filters.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">Product</th>
                          <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                          <th className="text-center px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500 w-44">Quantity</th>
                          <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">Total</th>
                          <th className="px-3 py-3.5 w-10" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filtered.map((p) => {
                          const q = qty[p.id] || 0;
                          return (
                            <tr
                              key={p.id}
                              className={`transition-colors ${q > 0 ? "bg-orange-50/40" : "hover:bg-gray-50/60"}`}
                            >
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl bg-gray-100 grid place-items-center overflow-hidden shrink-0">
                                    <img src={p.image} alt={p.name} className="w-10 h-10 object-contain" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-sm text-gray-900">{p.name}</p>
                                    <p className="text-xs text-gray-400">{p.category}</p>
                                    {p.badge && (
                                      <span className="text-[10px] text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded-full">{p.badge}</span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-right">
                                <span className="font-bold text-gray-900">₹{p.price}</span>
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => setQ(p.id, q - 1)}
                                    disabled={q === 0}
                                    className="w-8 h-8 rounded-full border border-gray-200 grid place-items-center hover:border-primary hover:text-primary disabled:opacity-30 transition"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <input
                                    type="number"
                                    min={0}
                                    value={q}
                                    onChange={(e) => setQ(p.id, +e.target.value || 0)}
                                    className="w-14 h-8 text-center rounded-lg border border-gray-200 bg-white text-sm font-bold outline-none focus:border-primary transition"
                                  />
                                  <button
                                    onClick={() => setQ(p.id, q + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-200 grid place-items-center hover:border-primary hover:text-primary transition"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-right">
                                <span className={`font-bold text-sm ${q > 0 ? "text-primary" : "text-gray-300"}`}>
                                  {q > 0 ? `₹${q * p.price}` : "—"}
                                </span>
                              </td>
                              <td className="px-3 py-3.5">
                                {q > 0 && (
                                  <button
                                    onClick={() => setQ(p.id, 0)}
                                    className="w-7 h-7 rounded-lg grid place-items-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sticky summary bar */}
              <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.10)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Items Selected</p>
                    <p className="text-2xl font-black text-gray-900">{totalItems}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total Amount</p>
                    <p className="text-2xl font-black text-primary">₹{totalAmount}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setQty({})}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={addAllToCart}
                    disabled={totalItems === 0}
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_20px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add All to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Cart illustration */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="h-72 mb-6">
                  <CartIllustration />
                </div>
                <div className="bg-gradient-to-br from-primary/8 to-amber-50 rounded-2xl p-5 border border-primary/15">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Why Quick Order?</h3>
                  <ul className="space-y-2.5">
                    {[
                      "Order multiple items at once",
                      "No need to browse pages",
                      "See total instantly",
                      "Fast bulk ordering",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-primary/15 grid place-items-center shrink-0">
                          <span className="text-[10px]">✓</span>
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QuickOrder;
