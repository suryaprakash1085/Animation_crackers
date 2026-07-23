import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

const WhatsApp = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.845L.057 23.5l5.797-1.522A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.368l-.359-.213-3.441.902.919-3.354-.233-.372A9.818 9.818 0 1112 21.818z" />
  </svg>
);

export const Footer = () => (
  <footer className="bg-gray-900 text-white mt-20">
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid gap-10 md:grid-cols-4">
      <div>
        <Link to="/" className="flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 grid place-items-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
              <path d="M12 2L8.5 8.5 2 9.27l5 4.87L5.82 21 12 17.27 18.18 21 17 14.14l5-4.87-6.5-.77L12 2z" />
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-lg leading-tight block">STAR</span>
            <span className="font-display font-bold text-[10px] tracking-[0.2em] leading-tight block text-primary">FIREWORKS</span>
          </div>
        </Link>
        <p className="text-sm text-gray-400 leading-relaxed">
          A trusted name in the fireworks industry, delivering premium quality crackers with safety and innovation since 2010.
        </p>
        <div className="flex gap-3 mt-5">
          {[
            { Icon: Facebook, href: "#" },
            { Icon: Instagram, href: "#" },
            { Icon: Youtube, href: "#" },
            { Icon: WhatsApp, href: "#" },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all hover:-translate-y-0.5">
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold mb-4 uppercase tracking-wide text-sm">Quick Links</h4>
        <ul className="space-y-2.5 text-sm text-gray-400">
          {[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Products", to: "/products" },
            { label: "Quick Order", to: "/quick-order" },
            { label: "Offers", to: "/offers" },
            { label: "Contact", to: "/contact" },
          ].map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="hover:text-primary transition">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold mb-4 uppercase tracking-wide text-sm">Categories</h4>
        <ul className="space-y-2.5 text-sm text-gray-400">
          {["Sparklers", "Flower Pots", "Rockets", "Bombs", "Fancy Fireworks", "Gift Boxes"].map((l) => (
            <li key={l}>
              <Link to="/products" className="hover:text-primary transition">{l}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold mb-4 uppercase tracking-wide text-sm">Contact Us</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">📍</span>
            <span>125 Fireworks Street, Sivakasi, Tamil Nadu, India</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">📞</span>
            <span>+91 98765 43210</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✉️</span>
            <span>info@starfireworks.com</span>
          </li>
        </ul>
        <div className="mt-5">
          <p className="text-xs text-gray-500 mb-2">Get festival offers in your inbox</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/60 transition" />
            <button type="submit" className="px-3 py-2 bg-primary rounded-lg text-sm font-semibold hover:bg-primary/90 transition">Go</button>
          </form>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} Star Fireworks. All rights reserved. Celebrating with you, safely.
    </div>
  </footer>
);
