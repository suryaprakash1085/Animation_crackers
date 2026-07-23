import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Fireworks } from "@/components/Fireworks";
import { FloatingSparks } from "@/components/FloatingSparks";
import { Tag, Gift, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const useCountdown = (target: Date) => {
  const [t, setT] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const i = setInterval(() => setT(target.getTime() - Date.now()), 1000);
    return () => clearInterval(i);
  }, [target]);
  const s = Math.max(0, Math.floor(t / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
};

const offerCards = [
  {
    emoji: "🎆",
    tag: "Mega Diwali Sale",
    off: "Up to 50% Off",
    desc: "All rockets, sparklers and fancy items at unbeatable prices.",
    color: "#F97316",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200",
  },
  {
    emoji: "🎉",
    tag: "Dhamaka Combo",
    off: "Up to 40% Off",
    desc: "Curated combos for the ultimate festive experience.",
    color: "#8B5CF6",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
  },
  {
    emoji: "🎁",
    tag: "Special Gift Packs",
    off: "Up to 30% Off",
    desc: "Ready-to-gift boxes for families, friends & corporates.",
    color: "#F59E0B",
    bg: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
  },
];

const Offers = () => {
  const target = new Date(Date.now() + 5 * 86400000 + 12 * 3600000);
  const c = useCountdown(target);

  return (
    <Layout>
      {/* ── HEADER ── */}
      <section className="relative pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <Fireworks intensity={0.6} />
        <FloatingSparks count={14} />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-4 py-1.5 text-sm font-bold mb-5 shadow-[0_4px_14px_rgba(249,115,22,0.4)]">
              <Zap className="w-3.5 h-3.5" /> Limited Time Only
            </div>
            <h1 className="font-display font-black text-6xl md:text-7xl text-gray-900 mb-3">
              Festival{" "}
              <span className="text-gradient-festive">Offers</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Grab the best deals before the offer ends!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Offer ends in</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-4 gap-4"
          >
            {[
              { label: "Days", v: c.d },
              { label: "Hours", v: c.h },
              { label: "Minutes", v: c.m },
              { label: "Seconds", v: c.s },
            ].map((u) => (
              <div key={u.label} className="text-center">
                <div className="bg-gradient-to-br from-primary to-orange-400 text-white font-display font-black text-4xl md:text-5xl py-5 rounded-2xl shadow-[0_8px_30px_rgba(249,115,22,0.35)] mb-2">
                  {String(u.v).padStart(2, "0")}
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wide">
                  {u.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MEGA OFFER BANNER ── */}
      <section className="py-8 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-orange-400 p-8 md:p-14 grid md:grid-cols-2 gap-6 items-center mb-10"
          >
            <FloatingSparks count={8} />
            <div className="relative z-10 text-white">
              <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-sm font-bold mb-4">
                🔥 UP TO 50% OFF
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-3 leading-tight">
                Diwali Mega{" "}
                <span className="text-amber-200">Bonanza</span>
              </h2>
              <p className="text-white/80 mb-7 max-w-md">
                All categories. All products. One mega sale you don't want to miss. Shop now before stocks run out!
              </p>
              <Link to="/products">
                <button className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3 rounded-full hover:bg-amber-50 transition">
                  <Tag className="w-4 h-4" /> Shop Now
                </button>
              </Link>
            </div>

            <div className="relative z-10 flex justify-center">
              <motion.div
                animate={{ rotate: [-3, 3, -3], y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-[140px] select-none leading-none"
              >
                🎆
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OFFER CARDS ── */}
      <section className="pb-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {offerCards.map((o, i) => (
              <motion.div
                key={o.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${o.bg} border ${o.border} p-7 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all`}
              >
                <div className="text-5xl mb-4">{o.emoji}</div>
                <div
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold mb-3 text-white"
                  style={{ background: o.color }}
                >
                  {o.off}
                </div>
                <h3 className="font-display font-black text-xl text-gray-900 mb-2">{o.tag}</h3>
                <p className="text-sm text-gray-500 mb-5">{o.desc}</p>
                <Link to="/products">
                  <button
                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group"
                    style={{ color: o.color }}
                  >
                    Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 mb-4">Looking for something specific?</p>
            <Link to="/quick-order">
              <button className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 transition-all">
                <Gift className="w-4 h-4" /> Quick Order Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Offers;
