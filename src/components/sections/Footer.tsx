const Footer = () => (
  <footer className="border-t border-hairline py-12">
    <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <span className="font-display text-sm font-bold text-primary-foreground">A</span>
        </div>
        <span className="font-display text-base font-semibold tracking-tight">
          Apex Web Solutions
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Apex Web Solutions. Crafted with care.
      </p>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
        <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
        <a href="mailto:hello@apexweb.studio" className="hover:text-foreground transition-colors">Email</a>
      </div>
    </div>
  </footer>
);

export default Footer;
