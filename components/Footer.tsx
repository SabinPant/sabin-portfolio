const links = [
  { label: "GitHub", href: "https://github.com/SabinPant" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sabinpant" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        {/* Row 1: who, and where else to find him */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="label-micro text-muted-foreground">
            © <span className="tnum">{year}</span> Sabin Pant
          </p>

          <nav className="flex items-center gap-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                data-touch-target
                className="label-micro inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Row 2: the build plate, and a way back up */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="label-micro">Built with Next.js, TypeScript, Tailwind CSS</p>

          <a
            href="#hero"
            data-touch-target
            className="label-micro inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            Back to top
            <span aria-hidden="true">&#8593;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
