export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--border) py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-1">
        <p className="text-xs text-(--muted-foreground)">
          Designed &amp; built by{" "}
          <span className="text-(--foreground) font-medium">Sabin Pant</span>
        </p>
        <p className="text-[11px] text-(--muted-foreground)/70">
          © {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
