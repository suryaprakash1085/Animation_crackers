import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, Shield, ShoppingCart, Sparkles, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/quick-order", label: "Quick Order" },
  { to: "/offers", label: "Offers" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`container-festive flex items-center justify-between rounded-full px-5 py-3 transition-all ${
          scrolled
            ? "glass-card shadow-soft"
            : "glass-card"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-festive grid place-items-center shadow-soft group-hover:animate-wiggle">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full bg-festive blur-md opacity-50 -z-10" />
          </div>
          <span className="font-display font-bold text-xl text-gradient-festive">
            Fire Crackers
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/10 -z-10" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden sm:grid place-items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors text-foreground/70 hover:text-primary">
            <Search className="w-4 h-4" />
          </button>
          <Link
            to="/admin/login"
            title="Admin Login"
            aria-label="Admin Login"
            className="hidden sm:grid place-items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors text-foreground/70 hover:text-primary"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative grid place-items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors text-foreground/70 hover:text-primary">
            <ShoppingCart className="w-4 h-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-festive text-white text-[10px] font-bold grid place-items-center shadow-soft animate-scale-in">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid place-items-center w-10 h-10 rounded-full hover:bg-primary/10 text-foreground/70"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden container-festive mt-2 glass-card rounded-3xl p-4 animate-fade-in-up">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-2xl font-medium transition ${
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
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
