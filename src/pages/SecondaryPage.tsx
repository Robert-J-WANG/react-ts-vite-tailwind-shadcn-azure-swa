import { useEffect } from "react";
import { Link } from "react-router";

export function SecondaryPage() {
  useEffect(() => {
    document.title = "Secondary route | Application Template";
  }, []);

  return (
    <main>
      <h1>Secondary route</h1>
      <p>This placeholder confirms that client-side routing is working.</p>
      <Link to="/">Return home</Link>
    </main>
  );
}
