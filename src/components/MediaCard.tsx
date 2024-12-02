import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Media } from "@/lib/tmdb";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  media: Media;
}

export function MediaCard({ media }: MediaCardProps) {
  const title = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const year = date ? new Date(date).getFullYear() : "";
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    toggleFavorite.mutate({
      mediaId: media.id,
      mediaType: media.media_type,
    });
  };

  const favorite = isFavorite(media.id, media.media_type);

  return (
    <Link to={`/${media.media_type}/${media.id}`}>
      <Card className="group relative overflow-hidden transition-all hover:scale-105">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute bottom-0 p-4 space-y-2">
            <p className="font-semibold text-lg text-white">{title}</p>
            <p className="text-sm text-white/80">{year}</p>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100",
            favorite && "text-red-500"
          )}
          onClick={handleFavoriteClick}
        >
          <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
        </Button>
      </Card>
    </Link>
  );
}