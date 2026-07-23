import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, Shield, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Product" },
  { to: "/quick-order", label: "Quick Order" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 grid place-items-center shadow-soft group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
              <path d="M12 2L8.5 8.5 2 9.27l5 4.87L5.82 21 12 17.27 18.18 21 17 14.14l5-4.87-6.5-.77L12 2z" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-primary blur-md opacity-40 -z-10" />
          </div>
          <div>
            <span className="font-display font-bold text-lg leading-tight block text-foreground">STAR</span>
            <span className="font-display font-bold text-[10px] tracking-[0.2em] leading-tight block text-primary">FIREWORKS</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-semibold rounded-lg transition-all uppercase tracking-wide ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/60 hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="grid place-items-center w-9 h-9 rounded-lg hover:bg-primary/8 transition-colors text-foreground/60 hover:text-primary">
            <Search className="w-4 h-4" />
          </button>
          <Link
            to="/admin/login"
            title="Admin"
            className="hidden sm:grid place-items-center w-9 h-9 rounded-lg hover:bg-primary/8 transition-colors text-foreground/60 hover:text-primary"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative grid place-items-center w-9 h-9 rounded-lg hover:bg-primary/8 transition-colors text-foreground/60 hover:text-primary ml-1"
          >
            <ShoppingCart className="w-4 h-4" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-primary text-white text-[9px] font-bold grid place-items-center shadow-soft">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid place-items-center w-9 h-9 rounded-lg hover:bg-primary/8 text-foreground/60 ml-1"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border/60 px-4 py-3 shadow-lg">
          <nav className="flex flex-col gap-0.5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/60 hover:bg-primary/5 hover:text-primary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
