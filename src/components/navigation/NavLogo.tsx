import { Button } from "@/components/ui/button";
import { Snowflake } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function NavLogo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" asChild className="h-9 w-9">
          <Link to="/">
            <Snowflake className="h-6 w-6" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Home</TooltipContent>
    </Tooltip>
  );
}