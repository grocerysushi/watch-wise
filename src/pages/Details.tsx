import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMediaDetails } from "@/lib/tmdb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaHeader } from "@/components/media/MediaHeader";
import { MediaOverview } from "@/components/media/MediaOverview";
import { MediaSeasons } from "@/components/media/MediaSeasons";
import { MediaProviders } from "@/components/media/MediaProviders";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const Details = () => {
  const { type, id } = useParams();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const { data: media, isLoading } = useQuery({
    queryKey: ["media", id, type],
    queryFn: () => getMediaDetails(Number(id), type as "movie" | "tv"),
    enabled: !!id && !!type,
  });

  if (isLoading) {
    return (
      <div className="container min-h-screen pt-24 pb-8">
        <div className="h-[400px] animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!media) return null;

  const title = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const year = date ? new Date(date).getFullYear() : "";
  const favorite = isFavorite(media.id, media.media_type);

  const handleFavoriteClick = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    toggleFavorite.mutate({
      mediaId: media.id,
      mediaType: media.media_type,
    });
  };

  return (
    <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
      <MediaHeader
        title={title}
        year={year.toString()}
        status={media.status}
        backdropPath={media.backdrop_path}
      />

      <div className="grid md:grid-cols-[400px,1fr] gap-8">
        <div className="relative group">
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title}
            className="w-full rounded-lg"
          />
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100 bg-background/50 backdrop-blur-sm",
              favorite && "text-red-500 opacity-100"
            )}
            onClick={handleFavoriteClick}
          >
            <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
          </Button>
        </div>

        <div className="space-y-6">
          <MediaOverview
            overview={media.overview}
            runtime={media.runtime}
            numberOfSeasons={media.number_of_seasons}
            numberOfEpisodes={media.number_of_episodes}
          />
          
          {media.media_type === "tv" && media.seasons && (
            <MediaSeasons seasons={media.seasons} />
          )}
        </div>
      </div>

      {media.watch_providers && (
        <div className="mt-8">
          <MediaProviders providers={media.watch_providers} />
        </div>
      )}
    </div>
  );
};

export default Details;