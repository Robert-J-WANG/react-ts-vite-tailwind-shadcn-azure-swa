import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export function RouteErrorPage() {
  useEffect(() => {
    document.title = "Application error | Application Template";
  }, []);

  return (
    <section className="m-auto max-w-xl text-center">
      <p className="text-sm font-semibold text-destructive">Application error</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The application could not display this route.
      </p>
      <Button className="mt-8" onClick={() => window.location.assign("/")}>
        Return home
      </Button>
    </section>
  );
}
