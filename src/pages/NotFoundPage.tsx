import { useEffect } from "react";
import { Link } from "react-router";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found | Application Template";
  }, []);

  return (
    <main>
      <h1>Page not found</h1>
      <p>The requested route does not exist.</p>
      <Link to="/">Return home</Link>
    </main>
  );
}
