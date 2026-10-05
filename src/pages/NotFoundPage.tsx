import { useEffect } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found | Application Template";
  }, []);

  return (
    <section className="m-auto max-w-xl text-center">
      <p className="text-sm font-semibold text-muted-foreground">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The requested route does not exist.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Return home</Link>
      </Button>
    </section>
  );
}
