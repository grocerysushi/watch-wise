import { Button } from "@/components/ui/button";
import { SearchButton } from "@/components/search/SearchButton";
import { Link, useNavigate } from "react-router-dom";
import { Heart, LogIn, LogOut, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { SearchDialog } from "@/components/SearchDialog";

export function Navigation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
      return;
    }
    navigate("/");
  };

  return (
    <>
      <SearchDialog open={showSearch} onOpenChange={setShowSearch} />
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Movies
          </Link>
          <div className="flex items-center gap-2">
            <SearchButton onClick={() => setShowSearch(true)} />
            <Button variant="ghost" size="icon" asChild>
              <Link to="/upcoming">
                <Calendar className="h-5 w-5" />
              </Link>
            </Button>
            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/favorites">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/login">
                  <LogIn className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}