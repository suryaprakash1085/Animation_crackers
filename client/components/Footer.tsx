import { Link } from "react-router-dom";
import { Facebook, Instagram, Sparkles, Twitter, Youtube } from "lucide-react";

export const Footer = () => (
  <footer className="relative mt-20 border-t border-border/60 bg-gradient-to-b from-transparent to-secondary/20">
    <div className="container-festive section-pad !py-14 grid gap-10 md:grid-cols-4">
      <div>
        <Link to="/" className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-festive grid place-items-center shadow-soft">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-gradient-festive">Fire Crackers</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          Lighting up your celebrations with premium quality crackers since 2010.
        </p>
        <div className="flex gap-3 mt-4">
          {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full glass-card hover:text-primary transition-all hover:-translate-y-0.5">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["Home","About","Services","Products","Offers","Contact"].map((l) => (
            <li key={l}><a href="#" className="hover:text-primary transition">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Categories</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["Rockets","Sparklers","Fountains","Bombs","Gift Boxes"].map((l) => (
            <li key={l}><a href="#" className="hover:text-primary transition">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Newsletter</h4>
        <p className="text-sm text-muted-foreground mb-3">Get festive offers in your inbox.</p>
        <form className="flex gap-2">
          <input type="email" placeholder="Your email" className="input-glow flex-1 text-sm py-2" />
          <button type="submit" className="btn-spark !px-4 !py-2 text-sm">Subscribe</button>
        </form>
      </div>
    </div>
    <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Fire Crackers. Celebrating with you, safely.
    </div>
  </footer>
);
