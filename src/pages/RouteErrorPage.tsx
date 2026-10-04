import { useEffect } from "react";

export function RouteErrorPage() {
  useEffect(() => {
    document.title = "Application error | Application Template";
  }, []);

  return (
    <main>
      <h1>Something went wrong</h1>
      <p>The application could not display this route.</p>
    </main>
  );
}
