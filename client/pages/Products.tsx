import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { products, type Category, type Product } from "@/data/products";
import { Search } from "lucide-react";

type CatFilter = "All" | Category | "Fancy";
const categories: { label: string; value: CatFilter }[] = [
  { label: "All", value: "All" },
  { label: "Sparklers", value: "Sparklers" },
  { label: "Flower Pots", value: "Fountains" },
  { label: "Rockets", value: "Rockets" },
  { label: "Bombs", value: "Bombs" },
  { label: "Fancy", value: "Fancy" },
];
const sorts = ["Popularity", "Price: Low to High", "Price: High to Low", "Name"] as const;

const Products = () => {
  const [cat, setCat] = useState<CatFilter>("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Popularity");
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let r = products.filter((p) =>
      (cat === "All" || cat === "Fancy" || p.category === cat) &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price <= maxPrice
    );
    if (sort === "Price: Low to High") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "Name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [cat, search, maxPrice, sort]);

  return (
    <Layout>
      <section className="pt-24 pb-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="text-primary font-semibold text-sm mb-2">Our Products</div>
            <h1 className="font-display font-black text-5xl md:text-6xl text-gray-900">
              Our <span className="text-gradient-festive">Premium Products</span>
            </h1>
            <p className="text-gray-500 mt-3 max-w-lg">
              Explore our wide range of premium quality crackers.
            </p>
          </motion.div>

          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  cat === c.value
                    ? "bg-primary text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)]"
                    : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition"
              />
            </div>
            <div className="flex gap-3 items-center">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-primary/60 transition text-gray-700"
              >
                {sorts.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                {filtered.length} products
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Price Range:</span>
            <input
              type="range" min={50} max={2000} step={10} value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="flex-1 accent-primary h-2 cursor-pointer"
            />
            <span className="text-sm font-bold text-primary whitespace-nowrap">Up to ₹{maxPrice}</span>
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl p-16 text-center text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold">No products match your filters.</p>
            </div>
          ) : (
            <motion.div
              key={cat + search + maxPrice}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onImageClick={setActive} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <ProductModal product={active} onClose={() => setActive(null)} />
    </Layout>
  );
};

export default Products;
