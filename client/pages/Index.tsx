import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Package, ShieldCheck, Star, Truck, Zap } from "lucide-react";
import { Layout } from "@/components/Layout";
import { HeroScene3D } from "@/components/HeroScene3D";
import { SparkButton } from "@/components/SparkButton";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { useHomeSettings } from "@/lib/appSettings";
import { Icon } from "@/lib/iconMap";
import { FloatingSparks } from "@/components/FloatingSparks";

const featureItems = [
  { icon: CheckCircle2, title: "Premium Quality", desc: "Finest quality products for extra brightness" },
  { icon: ShieldCheck, title: "Safe & Certified", desc: "100% safe with BIS certification" },
  { icon: Package, title: "Best Price Guarantee", desc: "Get the best quality at affordable prices" },
  { icon: Truck, title: "Fast Delivery", desc: "On-time delivery guaranteed" },
];

const whyItems = [
  { icon: "🏆", title: "14+ Years", desc: "of Experience" },
  { icon: "🎆", title: "500+", desc: "Products" },
  { icon: "😊", title: "2M+", desc: "Happy Customers" },
  { icon: "✅", title: "100%", desc: "Safe & Certified" },
];

const Index = () => {
  const h = useHomeSettings();

  return (
    <Layout>
      {/* ── HERO ── */}
      {h.hero.show && (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
          <FloatingSparks count={12} />

          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-amber-300/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/8 to-orange-300/8 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-4 items-center min-h-screen pt-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="py-12 lg:py-0"
            >
              {h.hero.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold text-primary mb-6"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {h.hero.badge}
                </motion.div>
              )}

              <h1 className="font-display font-black text-6xl md:text-7xl xl:text-8xl leading-[0.95] mb-6 text-gray-900">
                {h.hero.title && (
                  <span className="block">{h.hero.title}</span>
                )}
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, hsl(24 95% 50%), hsl(38 92% 55%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {h.hero.titleHighlight || "EVERY MOMENT"}
                </span>
              </h1>

              <p className="text-lg text-gray-500 max-w-md mb-8 leading-relaxed">
                {h.hero.subtitle || "Premium Quality Crackers for Your Celebrations"}
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {h.hero.ctaPrimary && (
                  <Link to={h.hero.ctaPrimaryLink || "/products"}>
                    <button className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-full shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 transition-all text-sm">
                      {h.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                )}
                {h.hero.ctaSecondary && (
                  <Link to={h.hero.ctaSecondaryLink || "/quick-order"}>
                    <button className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-7 py-3.5 rounded-full hover:bg-primary hover:text-white transition-all text-sm">
                      <Zap className="w-4 h-4" />
                      {h.hero.ctaSecondary}
                    </button>
                  </Link>
                )}
              </div>

              {/* Scroll indicator */}
              <div className="hidden lg:flex flex-col items-start gap-2">
                <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent ml-1" />
              </div>
            </motion.div>

            {/* Right – 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative h-[520px] lg:h-[680px]"
            >
              <Suspense fallback={
                <div className="w-full h-full grid place-items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                </div>
              }>
                <HeroScene3D />
              </Suspense>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-12 -left-4 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 grid place-items-center text-xl">🎆</div>
                <div>
                  <div className="font-bold text-lg text-gray-900 leading-tight">500+</div>
                  <div className="text-xs text-gray-500">Products</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-20 -right-2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 grid place-items-center text-xl">😊</div>
                <div>
                  <div className="font-bold text-lg text-gray-900 leading-tight">2M+</div>
                  <div className="text-xs text-gray-500">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature strip */}
          {h.featureStrip.show && (
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featureItems.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-gray-100"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{f.title}</div>
                      <div className="text-xs text-gray-500">{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── FEATURED PRODUCTS ── */}
      {h.featured.show && (
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                <Star className="w-4 h-4 fill-current" />
                {h.featured.eyebrow || "Our Products"}
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-gray-900">
                {h.featured.title || "Our"}{" "}
                <span className="text-gradient-festive">{h.featured.titleHighlight || "Premium Products"}</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-lg">Explore our wide range of premium quality crackers.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.slice(0, 8).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/products">
                <button className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all">
                  View All Products <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── OFFER BANNER ── */}
      {h.offer.show && (
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-orange-400 p-8 md:p-12 grid md:grid-cols-2 gap-6 items-center"
            >
              <FloatingSparks count={10} />
              <div className="relative z-10 text-white">
                {h.offer.badge && (
                  <span className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-bold mb-4">
                    🎉 {h.offer.badge}
                  </span>
                )}
                <h2 className="font-display font-black text-4xl md:text-5xl mb-3 leading-tight">
                  {h.offer.title || "Festival"}{" "}
                  <span className="text-amber-200">{h.offer.titleHighlight || "Mega Sale"}</span>
                </h2>
                <p className="text-white/80 mb-6 max-w-md">{h.offer.description}</p>
                {h.offer.cta && (
                  <Link to={h.offer.ctaLink || "/offers"}>
                    <button className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3 rounded-full hover:bg-amber-50 transition">
                      {h.offer.cta} <Icon name="Gift" className="w-4 h-4" />
                    </button>
                  </Link>
                )}
              </div>
              <div className="relative z-10 flex justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-9xl select-none"
                >
                  🎆
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US / STATS ── */}
      {h.why.show && (
        <section className="py-20 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="font-display font-black text-4xl md:text-5xl text-gray-900">
                {h.why.title || "Why"}{" "}
                <span className="text-gradient-festive">{h.why.titleHighlight || "Choose Us?"}</span>
              </h2>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {whyItems.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="bg-white rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100"
                >
                  <div className="text-4xl mb-2">{w.icon}</div>
                  <div className="font-display font-black text-3xl text-primary">{w.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{w.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Why cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {h.why.items.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 transition-all"
                >
                  <div
                    className="w-14 h-14 mx-auto rounded-2xl grid place-items-center mb-4"
                    style={{
                      background: `hsl(${w.colorHue} 95% 93%)`,
                      boxShadow: `0 0 20px hsl(${w.colorHue} 90% 70% / 0.3)`,
                    }}
                  >
                    <Icon name={w.icon} className="w-7 h-7" style={{ color: `hsl(${w.colorHue} 75% 45%)` }} />
                  </div>
                  <h3 className="font-display font-bold text-base mb-1 text-gray-900">{w.title}</h3>
                  <p className="text-xs text-gray-500">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
