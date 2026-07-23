import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useAboutSettings } from "@/lib/appSettings";
import { Icon } from "@/lib/iconMap";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const journeyItems = [
  { year: "2010", title: "Our Journey Started", color: "bg-primary" },
  { year: "2014", title: "Expanded Our Products", color: "bg-orange-400" },
  { year: "2018", title: "New Manufacturing Unit", color: "bg-amber-500" },
  { year: "2023", title: "3M+ Happy Customers", color: "bg-green-500" },
];

const certBadges = [
  { icon: ShieldCheck, title: "Safety First", desc: "We follow 100% safety standards in our manufacturing process." },
  { icon: CheckCircle2, title: "Certified Quality", desc: "All our products are BIS certified and eco-friendly." },
];

/* Simple isometric factory SVG illustration */
const FactoryIllustration = () => (
  <svg viewBox="0 0 480 380" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sky gradient */}
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF7ED" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
      <linearGradient id="buildGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F3F4F6" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
    </defs>
    <rect width="480" height="380" fill="url(#skyGrad)" rx="20" />

    {/* Ground */}
    <ellipse cx="240" cy="340" rx="200" ry="25" fill="#D1FAE5" opacity="0.5" />

    {/* Main factory building */}
    <rect x="120" y="170" width="180" height="150" fill="url(#buildGrad)" rx="4" />
    <rect x="120" y="155" width="180" height="20" fill="#E5E7EB" rx="2" />
    {/* Roof */}
    <polygon points="110,170 300,170 290,145 120,145" fill="#D1D5DB" />
    {/* Windows */}
    {[140, 175, 210, 245].map((x) => (
      <rect key={x} x={x} y="190" width="28" height="22" fill="#BFDBFE" rx="3" />
    ))}
    {/* Door */}
    <rect x="195" y="260" width="40" height="60" fill="#9CA3AF" rx="4" />
    {/* Gate */}
    <rect x="185" y="315" width="60" height="8" fill="#6B7280" />

    {/* Left chimney */}
    <rect x="140" y="90" width="22" height="80" fill="#9CA3AF" rx="3" />
    <rect x="136" y="85" width="30" height="12" fill="#6B7280" rx="6" />
    {/* Smoke */}
    <circle cx="151" cy="70" r="10" fill="#D1D5DB" opacity="0.6" />
    <circle cx="158" cy="52" r="8" fill="#D1D5DB" opacity="0.4" />
    <circle cx="148" cy="38" r="6" fill="#D1D5DB" opacity="0.25" />

    {/* Right chimney */}
    <rect x="240" y="100" width="20" height="70" fill="#9CA3AF" rx="3" />
    <rect x="236" y="95" width="28" height="11" fill="#6B7280" rx="5" />
    {/* Smoke */}
    <circle cx="250" cy="82" r="9" fill="#D1D5DB" opacity="0.55" />
    <circle cx="256" cy="65" r="7" fill="#D1D5DB" opacity="0.35" />

    {/* Small side building */}
    <rect x="305" y="210" width="80" height="110" fill="#F9FAFB" rx="4" />
    <rect x="305" y="200" width="80" height="14" fill="#E5E7EB" rx="2" />
    <polygon points="298,214 390,214 382,192 306,192" fill="#E5E7EB" />
    <rect x="320" y="225" width="22" height="18" fill="#BFDBFE" rx="3" />
    <rect x="355" y="225" width="22" height="18" fill="#BFDBFE" rx="3" />

    {/* Truck */}
    <rect x="60" y="300" width="75" height="35" fill="#F97316" rx="5" />
    <rect x="60" y="290" width="38" height="25" fill="#FBBF24" rx="4" />
    <circle cx="82" cy="338" r="10" fill="#374151" />
    <circle cx="82" cy="338" r="5" fill="#9CA3AF" />
    <circle cx="122" cy="338" r="10" fill="#374151" />
    <circle cx="122" cy="338" r="5" fill="#9CA3AF" />

    {/* Trees */}
    <rect x="390" y="280" width="6" height="40" fill="#92400E" />
    <circle cx="393" cy="268" r="22" fill="#6EE7B7" />
    <circle cx="393" cy="258" r="16" fill="#34D399" />
    <rect x="415" y="290" width="5" height="30" fill="#92400E" />
    <circle cx="417" cy="280" r="17" fill="#6EE7B7" />
    <circle cx="417" cy="272" r="12" fill="#34D399" />

    {/* Star Fireworks sign */}
    <rect x="155" y="215" width="100" height="30" fill="#F97316" rx="4" />
    <text x="205" y="234" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">STAR FIREWORKS</text>
  </svg>
);

const About = () => {
  const a = useAboutSettings();

  return (
    <Layout>
      {/* ── HEADER SECTION ── */}
      <section className="pt-24 pb-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              {a.header.show && (
                <>
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold text-primary mb-5">
                    {a.header.badge || "About Us"}
                  </div>
                  <h1 className="font-display font-black text-5xl md:text-6xl text-gray-900 leading-tight mb-4">
                    {a.header.title || "Built on Passion,"}<br />
                    <span className="text-gradient-festive">{a.header.titleHighlight || "Driven by Safety"}</span>
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                    {a.header.description || "Star Fireworks is a trusted name in the fireworks industry, delivering premium quality crackers with safety and innovation since 2010."}
                  </p>
                </>
              )}

              {/* Pillars */}
              {a.pillars.show && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {a.pillars.items.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center mb-3">
                        <Icon name={c.icon} className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 mb-1">{c.title}</h3>
                      <p className="text-xs text-gray-500">{c.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Factory Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="h-80 lg:h-[420px]"
            >
              <FactoryIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      {a.stats.show && a.stats.items.length > 0 && (
        <section className="py-14 px-4 md:px-8 bg-gradient-to-r from-primary to-orange-400">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {a.stats.items.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center text-white"
                >
                  <div className="font-display font-black text-4xl md:text-5xl mb-1">{s.n}</div>
                  <div className="text-sm text-white/80 font-medium">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── JOURNEY TIMELINE ── */}
      {a.timeline.show && (
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="text-primary font-semibold text-sm mb-2">Our Story</div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-gray-900">
                {a.timeline.title || "Our"}{" "}
                <span className="text-gradient-festive">{a.timeline.titleHighlight || "Journey"}</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* connector line */}
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-amber-400 to-green-400" />
              <div className="grid md:grid-cols-4 gap-8">
                {(a.timeline.items.length > 0 ? a.timeline.items : journeyItems.map(j => ({ year: j.year, title: j.title, desc: "" }))).map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative text-center"
                  >
                    <div className={`w-16 h-16 mx-auto rounded-full ${journeyItems[i]?.color || "bg-primary"} text-white grid place-items-center font-display font-black text-lg shadow-[0_8px_24px_rgba(249,115,22,0.35)] mb-4 relative z-10`}>
                      {i + 1}
                    </div>
                    <div className="font-display font-black text-2xl text-gradient-festive">{t.year}</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">{t.title}</div>
                    {t.desc && <div className="text-xs text-gray-500 mt-1">{t.desc}</div>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CERTIFICATIONS ── */}
      <section className="py-14 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {certBadges.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 flex gap-4 items-start border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                  <p className="text-sm text-gray-500">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
