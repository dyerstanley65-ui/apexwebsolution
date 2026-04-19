import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-hairline bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between sm:h-20">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="font-display text-base font-bold text-primary-foreground">A</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Apex<span className="text-primary">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Button key={l.href} variant="nav" size="sm" asChild>
              <a href={l.href}>{l.label}</a>
            </Button>
          ))}
        </nav>

        <Button variant="hero" size="sm" asChild>
          <a href="#contact">Start project</a>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
