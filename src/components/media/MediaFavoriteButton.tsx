import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MediaFavoriteButtonProps {
  title: string;
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function MediaFavoriteButton({ title, isFavorite, onClick }: MediaFavoriteButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100",
              isFavorite && "text-red-500"
            )}
            onClick={onClick}
            aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}