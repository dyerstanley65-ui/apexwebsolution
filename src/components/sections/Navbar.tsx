import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

        <div className="flex items-center gap-2">
          <Button variant="hero" size="sm" asChild className="hidden sm:inline-flex">
            <a href="#contact">Start project</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-hairline bg-background">
              <SheetTitle className="font-display text-lg">
                Apex<span className="text-primary">.</span>
              </SheetTitle>
              <nav className="mt-10 flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary/60 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <Button variant="hero" size="lg" asChild className="mt-8 w-full">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Start project
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
