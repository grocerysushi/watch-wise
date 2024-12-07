import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function NavLinks() {
  const location = useLocation();
  const { user } = useAuth();

  const links = [
    { href: "/", label: "Discover" },
    { href: "/upcoming", label: "Upcoming" },
    ...(user ? [{ href: "/favorites", label: "Favorites" }] : []),
  ];

  return (
    <div className="flex gap-6">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}