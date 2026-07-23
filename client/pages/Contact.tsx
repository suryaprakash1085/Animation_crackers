import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Mail, MapPin, Phone, Send, Facebook, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";

/* Simple 3D city / map illustration */
const CityIllustration = () => (
  <svg viewBox="0 0 380 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cityBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EFF6FF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
    </defs>
    <rect width="380" height="320" fill="url(#cityBg)" rx="20" />

    {/* Roads */}
    <rect x="0" y="250" width="380" height="28" fill="#E5E7EB" />
    <rect x="160" y="0" width="28" height="320" fill="#E5E7EB" />
    {/* Road markings */}
    {[20, 60, 100, 210, 260, 310].map((x) => (
      <rect key={x} x={x} y="261" width="20" height="6" rx="3" fill="white" />
    ))}
    {[30, 80, 130, 180].map((y) => (
      <rect key={y} x="171" y={y} width="6" height="20" rx="3" fill="white" />
    ))}

    {/* Buildings */}
    {/* Tall center-left */}
    <rect x="60" y="100" width="60" height="150" fill="#93C5FD" rx="4" />
    <rect x="60" y="92" width="60" height="14" fill="#60A5FA" rx="4" />
    {[{ x: 68, y: 110 }, { x: 90, y: 110 }, { x: 68, y: 135 }, { x: 90, y: 135 }, { x: 68, y: 160 }, { x: 90, y: 160 }, { x: 68, y: 185 }, { x: 90, y: 185 }].map((w, i) => (
      <rect key={i} x={w.x} y={w.y} width="18" height="16" rx="2" fill="#DBEAFE" />
    ))}
    {/* Antenna */}
    <rect x="88" y="72" width="3" height="22" fill="#60A5FA" />

    {/* Wide right building */}
    <rect x="205" y="140" width="100" height="110" fill="#A78BFA" rx="4" />
    <rect x="205" y="132" width="100" height="14" fill="#8B5CF6" rx="4" />
    {[{ x: 215, y: 150 }, { x: 248, y: 150 }, { x: 280, y: 150 }, { x: 215, y: 178 }, { x: 248, y: 178 }, { x: 280, y: 178 }, { x: 215, y: 206 }, { x: 248, y: 206 }, { x: 280, y: 206 }].map((w, i) => (
      <rect key={i} x={w.x} y={w.y} width="20" height="18" rx="2" fill="#EDE9FE" />
    ))}

    {/* Small building left */}
    <rect x="20" y="180" width="35" height="70" fill="#86EFAC" rx="4" />
    {[{ x: 25, y: 188 }, { x: 44, y: 188 }, { x: 25, y: 212 }, { x: 44, y: 212 }].map((w, i) => (
      <rect key={i} x={w.x} y={w.y} width="12" height="12" rx="2" fill="#DCFCE7" />
    ))}

    {/* Trees */}
    <rect x="130" y="220" width="5" height="30" fill="#92400E" />
    <circle cx="132" cy="212" r="18" fill="#6EE7B7" />
    <circle cx="132" cy="204" r="13" fill="#34D399" />

    <rect x="340" y="215" width="5" height="35" fill="#92400E" />
    <circle cx="342" cy="207" r="20" fill="#6EE7B7" />
    <circle cx="342" cy="199" r="14" fill="#34D399" />

    {/* Pin marker - large */}
    <motion.g>
      <ellipse cx="174" cy="125" rx="18" ry="5" fill="#F97316" opacity="0.25" />
      <path d="M174 40 C155 40 140 55 140 73 C140 100 174 125 174 125 C174 125 208 100 208 73 C208 55 193 40 174 40 Z" fill="#F97316" />
      <circle cx="174" cy="73" r="14" fill="white" />
      <text x="174" y="78" textAnchor="middle" fill="#F97316" fontSize="14" fontWeight="bold">★</text>
    </motion.g>

    {/* Label */}
    <rect x="125" y="275" width="130" height="26" rx="13" fill="#F97316" />
    <text x="190" y="293" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">FIND US HERE</text>
  </svg>
);

const contactItems = [
  {
    icon: MapPin,
    title: "Address",
    value: "125 Fireworks Street, Sivakasi, Tamil Nadu, India",
    color: "#F97316",
    bg: "#FFF7ED",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 98765 43210",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@starfireworks.com",
    color: "#10B981",
    bg: "#F0FDF4",
  },
];

const socialLinks = [
  { Icon: Facebook, href: "#", color: "#1877F2" },
  { Icon: Instagram, href: "#", color: "#E4405F" },
  { Icon: Youtube, href: "#", color: "#FF0000" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you shortly. ✨");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <Layout>
      {/* ── HEADER ── */}
      <section className="pt-24 pb-12 px-4 md:px-8 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold text-primary mb-5">
              Contact Us
            </div>
            <h1 className="font-display font-black text-5xl md:text-6xl text-gray-900 mb-3">
              We'd Love to{" "}
              <span className="text-gradient-festive">Hear From You!</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              We're here to help! Reach out to us for any queries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[400px_1fr] gap-10">
          {/* Left: Info + Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactItems.map((c) => (
              <div
                key={c.title}
                className="flex gap-4 items-start p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-transform bg-white"
              >
                <div
                  className="w-12 h-12 rounded-xl grid place-items-center shrink-0"
                  style={{ background: c.bg }}
                >
                  <c.icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900 mb-0.5">{c.title}</div>
                  <div className="text-sm text-gray-500">{c.value}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="font-bold text-sm text-gray-900 mb-3">Follow Us</div>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, href, color }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 rounded-xl border border-gray-100 grid place-items-center hover:-translate-y-0.5 transition-transform"
                    style={{ background: `${color}12` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </a>
                ))}
              </div>
            </div>

            {/* City illustration */}
            <div className="h-52 rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <CityIllustration />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 space-y-5"
          >
            <h2 className="font-display font-black text-2xl text-gray-900 mb-6">Send Us a Message</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition bg-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Your Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition bg-white"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Your Message *</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition bg-white resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
