import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "@/components/ui/image";

export function NavLogo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" asChild className="h-9 w-9 p-0">
          <Link to="/">
            <Image
              src="/lovable-uploads/fcb9b293-feb8-4be9-94f6-e6c2a598f8a2.png"
              alt="Cueious Logo"
              className="h-7 w-7 transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Home</TooltipContent>
    </Tooltip>
  );
}