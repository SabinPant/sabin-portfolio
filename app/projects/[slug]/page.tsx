import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ArchDiagram from "@/components/ArchDiagram";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found · Sabin Pant" };
  }

  return {
    title: `${project.title} · Sabin Pant`,
    description: project.description,
    openGraph: {
      title: `${project.title} · Sabin Pant`,
      description: project.description,
      type: "article",
    },
  };
}

/* ═══════════════════════════════════════════════════════════
   The overview arrives from the data file as one long string.
   Nobody reads a 400-word block, so it gets regrouped at sentence
   boundaries into short paragraphs. Nothing is dropped: every
   sentence lands in exactly one paragraph, in the original order.
   ═══════════════════════════════════════════════════════════ */

const MAX_SENTENCES = 3;
const SOFT_LIMIT = 300; // characters, cuts early when sentences run long

function toParagraphs(text: string): string[] {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  let buffer: string[] = [];
  let length = 0;

  for (const sentence of sentences) {
    buffer.push(sentence);
    length += sentence.length;
    if (buffer.length >= MAX_SENTENCES || length >= SOFT_LIMIT) {
      paragraphs.push(buffer.join(" "));
      buffer = [];
      length = 0;
    }
  }
  if (buffer.length > 0) paragraphs.push(buffer.join(" "));

  // A single short sentence stranded at the end reads like a stub, fold it back
  if (paragraphs.length > 1) {
    const tail = paragraphs[paragraphs.length - 1];
    if (tail.length < 160) {
      paragraphs.splice(-2, 2, `${paragraphs[paragraphs.length - 2]} ${tail}`);
    }
  }

  return paragraphs;
}

function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

const pad2 = (n: number) => String(n).padStart(2, "0");

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const index = Math.max(
    projects.findIndex((p) => p.slug === project.slug),
    0,
  );
  const next =
    projects.length > 1 ? projects[(index + 1) % projects.length] : null;

  const overview = toParagraphs(project.longDescription);
  const minutes = readingMinutes(project.longDescription);
  const metrics = project.metrics ?? [];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* ═══ Nameplate: raised ground, identity first, instruments below ═══ */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-9 sm:pb-12">
          <Link
            href="/#projects"
            data-touch-target
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>

          <p className="label-micro mt-10 sm:mt-14">
            Project <span className="tnum">{pad2(index + 1)}</span> of{" "}
            <span className="tnum">{pad2(projects.length)}</span>
          </p>

          <h1 className="display text-4xl sm:text-5xl lg:text-6xl mt-3">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-[17px] text-secondary-foreground leading-relaxed max-w-[56ch]">
            {project.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline" className="font-mono text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-7 flex gap-3 flex-wrap">
            {project.github && (
              <Button variant="outline" size="lg" className="h-11 px-5" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-touch-target
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </Button>
            )}
            {project.demo && (
              <Button size="lg" className="h-11 px-5" asChild>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-touch-target
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Readout strip: the figures that back up the write-up */}
        {metrics.length > 0 && (
          <div className="border-t border-border bg-secondary">
            <dl className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-x-10 sm:gap-x-14 gap-y-5">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd className="display tnum text-2xl sm:text-3xl text-foreground">
                    {metric.value}
                  </dd>
                  <dd className="label-micro mt-1.5">{metric.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-14 sm:space-y-20">
        {/* ═══ Architecture: full width, the diagram needs the room ═══ */}
        <section aria-labelledby="architecture">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 id="architecture" className="display text-xl sm:text-2xl">
              Architecture
            </h2>
            <span className="label-micro">
              <span className="tnum">{project.arch.length}</span> stages
            </span>
          </div>

          <div className="rounded-lg border border-border-strong bg-card overflow-hidden shadow-lift-1">
            <div className="flex items-center justify-between gap-3 px-3.5 py-2 border-b border-border bg-secondary">
              <span className="font-mono text-[11px] text-muted-foreground truncate">
                {project.slug}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-primary shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-lit" />
                signal flow
              </span>
            </div>
            <ArchDiagram nodes={project.arch} caption={project.subtitle} />
          </div>
        </section>

        {/* ═══ Overview: labelled rail, prose held to a readable measure ═══ */}
        <section aria-labelledby="overview">
          <div className="grid lg:grid-cols-[9rem_1fr] gap-5 lg:gap-12">
            <div className="lg:sticky lg:top-12 h-fit">
              <h2 id="overview" className="display text-xl sm:text-2xl">
                Overview
              </h2>
              <p className="label-micro mt-2">
                <span className="tnum">{minutes}</span> min read
              </p>
            </div>

            <div className="max-w-[66ch]">
              {overview.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[15px] sm:text-base leading-[1.75] text-secondary-foreground"
                      : "mt-5 text-[15px] sm:text-base leading-[1.75] text-muted-foreground"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Highlights: numbered rows, denser than the prose above ═══ */}
        <section aria-labelledby="highlights">
          <div className="grid lg:grid-cols-[9rem_1fr] gap-5 lg:gap-12">
            <div className="lg:sticky lg:top-12 h-fit">
              <h2 id="highlights" className="display text-xl sm:text-2xl">
                Highlights
              </h2>
              <p className="label-micro mt-2">
                <span className="tnum">{project.highlights.length}</span> items
              </p>
            </div>

            <ol className="border-t border-border max-w-[70ch]">
              {project.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex gap-4 sm:gap-6 py-4 border-b border-border"
                >
                  <span className="label-micro tnum shrink-0 w-6 pt-1">
                    {pad2(i + 1)}
                  </span>
                  <span className="text-[15px] leading-relaxed text-secondary-foreground">
                    {highlight}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* Hands the reader on instead of ending on a dead stop */}
      {next && (
        <div className="border-t border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <Link
              href={`/projects/${next.slug}`}
              data-touch-target
              className="group inline-flex items-center gap-3"
            >
              <span className="label-micro group-hover:text-primary transition-colors">
                Next project
              </span>
              <span className="display text-lg sm:text-xl group-hover:text-primary transition-colors">
                {next.title}
              </span>
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="text-faint-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
              />
            </Link>

            <Link
              href="/#projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              All projects
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
