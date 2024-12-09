import { Button } from "@/components/ui/button";
import { SearchButton } from "@/components/search/SearchButton";
import { Link } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavActionsProps {
  onSearchClick: () => void;
}

export function NavActions({ onSearchClick }: NavActionsProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
      return;
    }
  };

  return (
    <div className="flex flex-1 items-center justify-end gap-2">
      <SearchButton onClick={onSearchClick} />
      {user ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login" aria-label="Log in">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Login</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}