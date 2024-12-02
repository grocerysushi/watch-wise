import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchDialog } from "@/components/SearchDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Navigation() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  return (
    <div className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold sm:inline-block">MovieDB</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <SearchDialog />
          <nav className="flex items-center space-x-2">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={handleSignOut}
              >
                Sign out
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </div>
  );
}