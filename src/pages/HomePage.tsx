import { useEffect } from "react";
import { Link } from "react-router";

export function HomePage() {
  useEffect(() => {
    document.title = "Application Template";
  }, []);

  return (
    <main>
      <h1>Application template</h1>
      <p>This placeholder confirms that the application is running.</p>
      <Link to="/secondary">Open secondary route</Link>
    </main>
  );
}
