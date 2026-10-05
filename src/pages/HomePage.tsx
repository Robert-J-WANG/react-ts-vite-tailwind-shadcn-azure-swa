import { useEffect } from "react";
import { Link } from "react-router";

import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HomePage() {
  useEffect(() => {
    document.title = "Application Template";
  }, []);

  return (
    <section className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          UI-ready application foundation
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Application template
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
          Start with a responsive shell, semantic design tokens, reusable UI
          primitives, tested routes, and an Azure delivery pipeline.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/secondary">
              Open secondary route
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://ui.shadcn.com" rel="noreferrer" target="_blank">
              Explore shadcn/ui
            </a>
          </Button>
        </div>
      </div>

      <aside className="rounded-2xl border bg-card p-6 text-card-foreground shadow-(--surface-shadow) sm:p-8">
        <h2 className="text-lg font-semibold">Ready to adapt</h2>
        <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
          {[
            'Responsive application shell',
            'Tailwind CSS design tokens',
            'Reusable shadcn/ui Button',
            'Unit and browser test coverage',
          ].map((capability) => (
            <li className="flex gap-3" key={capability}>
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
