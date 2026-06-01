export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted-foreground)]">
          © 2026{" "}
          <span className="text-[var(--foreground)] font-medium">
            Sabin Pant
          </span>
          . All rights reserved.
        </p>
        <p className="text-xs text-[var(--muted-foreground)]">
          Designed & built by Sabin Pant
        </p>
      </div>
    </footer>
  );
}
