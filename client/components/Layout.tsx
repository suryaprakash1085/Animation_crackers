import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CursorGlow } from "./CursorGlow";
import { Fireworks } from "./Fireworks";
import { FloatingSparks } from "./FloatingSparks";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen bg-sky-festive overflow-hidden">
    {/* Site-wide festive background animations */}
    <div className="fixed inset-0 pointer-events-none z-0">
      <Fireworks intensity={0.6} className="opacity-70" />
      <FloatingSparks count={20} />
    </div>
    <CursorGlow />
    <Navbar />
    <main className="relative z-10 pt-24">{children}</main>
    <Footer />
  </div>
);
