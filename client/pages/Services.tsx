import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { SparkButton } from "@/components/SparkButton";
import { Package, Sparkles, Gift, ArrowRight, Star, Users, Truck, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Package,
    title: "Bulk Orders",
    desc: "Get the best deals on bulk purchases for weddings, festivals & corporate events. Special pricing for large quantities.",
    color: "#F97316",
    bg: "#FFF7ED",
    features: ["Wholesale pricing", "Custom packaging", "Bulk discounts"],
  },
  {
    icon: Sparkles,
    title: "Event Fireworks",
    desc: "Make your events extraordinary with professional firework displays. We handle everything from planning to execution.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    features: ["Professional display", "Safety certified", "All event types"],
  },
  {
    icon: Gift,
    title: "Custom Gift Boxes",
    desc: "Curated festive gift boxes designed to delight your loved ones. Perfect for gifting during any celebration.",
    color: "#F59E0B",
    bg: "#FFFBEB",
    features: ["Custom branding", "Elegant packaging", "All occasions"],
  },
];

const statsRow = [
  { icon: Star, value: "500+", label: "Products" },
  { icon: Users, value: "2M+", label: "Customers" },
  { icon: Truck, value: "Pan India", label: "Delivery" },
  { icon: Phone, value: "24/7", label: "Support" },
];

const Services = () => (
  <Layout>
    {/* ── HEADER ── */}
    <section className="pt-24 pb-16 px-4 md:px-8 bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold text-primary mb-5">
            Our Services
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-gray-900 mb-4">
            We Provide the{" "}
            <span className="text-gradient-festive">Best Services</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From bulk orders to premium event fireworks — we've got your celebrations covered.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ── SERVICES CARDS ── */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all group overflow-hidden relative"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-30 transition-opacity group-hover:opacity-50"
                style={{ background: `radial-gradient(circle at top right, ${s.color}40, transparent)` }}
              />

              <div
                className="w-16 h-16 rounded-2xl grid place-items-center mb-5 group-hover:scale-110 transition-transform"
                style={{ background: s.bg, boxShadow: `0 0 20px ${s.color}30` }}
              >
                <s.icon className="w-8 h-8" style={{ color: s.color }} />
              </div>

              <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{s.desc}</p>

              <ul className="space-y-1.5 mb-6">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full grid place-items-center shrink-0" style={{ background: s.bg }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 font-bold text-sm group-hover:gap-2.5 transition-all"
                style={{ color: s.color }}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {statsRow.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 grid place-items-center mb-3">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display font-black text-2xl text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-orange-400 p-8 md:p-12 grid md:grid-cols-2 gap-6 items-center"
        >
          <div className="relative z-10 text-white">
            <h2 className="font-display font-black text-3xl md:text-4xl mb-3">
              Need Help With Bulk Order?
            </h2>
            <p className="text-white/80 mb-6">
              Get in touch with our team for the best quotes and customised fireworks packages.
            </p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3 rounded-full hover:bg-amber-50 transition">
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="relative z-10 flex justify-center">
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[120px] select-none"
            >
              🎁
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Services;
