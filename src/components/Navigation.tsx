import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full glass animate-fade-in">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          ShowSpace
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/newsletter" className="hover:text-primary transition-colors">
            Newsletter
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}