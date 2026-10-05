import { useEffect } from "react";
import { Link } from "react-router";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SecondaryPage() {
  useEffect(() => {
    document.title = "Secondary route | Application Template";
  }, []);

  return (
    <section className="m-auto w-full max-w-2xl rounded-2xl border bg-card p-8 text-card-foreground shadow-(--surface-shadow) sm:p-12">
      <p className="text-sm font-medium text-muted-foreground">
        Client-side navigation
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Secondary route
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        This placeholder confirms that the shared application shell and direct
        route navigation are working.
      </p>
      <Button asChild className="mt-8" variant="outline">
        <Link to="/">
          <ArrowLeft data-icon="inline-start" />
          Return home
        </Link>
      </Button>
    </section>
  );
}
