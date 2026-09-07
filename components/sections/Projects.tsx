"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { projects } from "@/data/projects";
import ArchDiagram from "@/components/ArchDiagram";
import SectionHeader from "@/components/SectionHeader";

export default function Projects() {
  const reduce = useReducedMotion();

  const featuredProjects = projects.filter(
    (project) => project.featured !== false,
  );

  /* One entrance, reused. Reduced motion gets the layout with no travel. */
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
      };

  return (
    /* The widest band on the page, and the only one on a recessed ground.
       Cards sit on top of it like instruments racked on a deck. */
    <section id="projects" className="relative border-y border-border bg-muted">
      <div className="max-w-[84rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-14">
          <SectionHeader
            title="Projects"
            description="Every project leads with the architecture it actually runs. Hover a stage to see what that layer owns, then open the write-up for the decisions behind it."
          />
          <p className="label-micro inline-flex items-center gap-2 shrink-0 sm:pb-1.5">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-signal-lit"
            />
            <span className="tnum">{featuredProjects.length}</span>
            &nbsp;systems, live diagrams
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {featuredProjects.map((project, i) => {
            const metrics = project.metrics ?? [];
            const overflow = project.stack.length - 6;

            return (
              <motion.article
                key={project.slug}
                {...rise}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group rounded-lg border border-border bg-card shadow-lift-1 overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:shadow-lift-2"
              >
                {/* Equipment plate: which unit this is, and how deep it goes */}
                <div className="flex items-center justify-between gap-3 px-4 sm:px-5 lg:px-6 py-2 border-b border-border">
                  <span className="inline-flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-[11px] tnum text-faint-foreground group-hover:text-primary transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground truncate">
                      projects/{project.slug}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground shrink-0">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-signal-lit"
                    />
                    <span className="tnum">{project.arch.length}</span> stages
                  </span>
                </div>

                {/* Identity in a narrow spec column, the diagram in the wide one.
                    On small screens the diagram jumps ahead of the prose. */}
                <div className="grid gap-6 lg:gap-x-8 lg:gap-y-6 p-4 sm:p-6 lg:p-8 lg:grid-cols-[19rem_minmax(0,1fr)] xl:grid-cols-[23rem_minmax(0,1fr)]">
                  <div className="order-1 lg:col-start-1 lg:row-start-1">
                    <h3 className="display text-2xl sm:text-3xl text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-secondary-foreground">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Inset panel: the diagram reads as a screen set into the card */}
                  <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-stretch flex flex-col justify-center rounded-md border border-border bg-background overflow-hidden">
                    <ArchDiagram
                      nodes={project.arch}
                      caption={project.subtitle}
                    />
                  </div>

                  <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 flex flex-col gap-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {metrics.length > 0 && (
                      <dl className="grid grid-cols-2 gap-x-5 gap-y-4 border-y border-border py-4">
                        {metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="flex flex-col-reverse gap-1"
                          >
                            <dt className="label-micro leading-snug">
                              {metric.label}
                            </dt>
                            <dd className="display m-0 text-xl sm:text-2xl leading-none tnum text-foreground">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2 py-1 rounded border border-border bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {overflow > 0 && (
                        <span className="font-mono text-[11px] px-2 py-1 rounded text-faint-foreground tnum">
                          +{overflow} more
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      data-touch-target
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 hover:gap-2.5"
                    >
                      View details
                      <span className="sr-only"> for {project.title}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Hands the reader forward instead of ending on the last card */}
        <motion.a
          {...rise}
          transition={{ duration: 0.5, ease: "easeOut" }}
          href="#certifications"
          className="mt-12 sm:mt-16 flex w-fit items-center gap-3 group"
        >
          <span className="label-micro group-hover:text-primary transition-colors">
            Next: certifications and training
          </span>
          <ArrowDown
            size={13}
            aria-hidden="true"
            className="text-faint-foreground group-hover:text-primary group-hover:translate-y-0.5 transition-all"
          />
        </motion.a>
      </div>
    </section>
  );
}
