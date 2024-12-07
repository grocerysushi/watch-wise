import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaHeaderProps {
  title: string;
  year: string;
  status?: string;
  backdropPath?: string;
  onFavoriteClick: () => void;
  onWatchedClick: () => void;
  isFavorite: boolean;
  isWatched: boolean;
}

export function MediaHeader({
  title,
  year,
  status,
  backdropPath,
  onFavoriteClick,
  onWatchedClick,
  isFavorite,
  isWatched,
}: MediaHeaderProps) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      {backdropPath ? (
        <img
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          alt={title}
          className="w-full aspect-video object-cover"
          loading="eager"
        />
      ) : (
        <div className="w-full aspect-video bg-muted" />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <span>{year}</span>
              {status && <span>• {status}</span>}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "transition-colors",
                isFavorite && "text-red-500"
              )}
              onClick={onFavoriteClick}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "transition-colors",
                isWatched && "text-green-500"
              )}
              onClick={onWatchedClick}
            >
              <CheckCircle2 className={cn("h-5 w-5", isWatched && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}