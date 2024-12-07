import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { UserNav } from "@/components/UserNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { openSearch } from "@/components/SearchCommand";

export function Navigation() {
  const location = useLocation();
  const { user } = useAuth();
  const { profile } = useProfile();

  const isActive = (path: string) => location.pathname === path;

  const SearchButton = () => {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openSearch()}
        aria-label="Search"
        className="focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <Search className="h-5 w-5" />
      </Button>
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="flex gap-2 md:gap-6 items-center flex-1">
          <Link
            to="/"
            className="hidden font-bold md:inline-block"
          >
            Cueious
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex gap-1">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  isActive("/") && "bg-muted"
                )}
              >
                Discover
              </Button>
            </Link>
            <Link to="/upcoming">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  isActive("/upcoming") && "bg-muted"
                )}
              >
                Upcoming
              </Button>
            </Link>
            {user && (
              <Link to="/favorites">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    isActive("/favorites") && "bg-muted"
                  )}
                >
                  Favorites
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SearchButton />
          <ThemeToggle />
          {user ? (
            <UserNav user={user} profile={profile} />
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}