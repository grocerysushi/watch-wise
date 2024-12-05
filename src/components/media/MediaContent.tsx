import { MediaOverview } from "@/components/media/MediaOverview";
import { MediaSeasons } from "@/components/media/MediaSeasons";
import { MediaProviders } from "@/components/media/MediaProviders";
import { MediaHeader } from "@/components/media/MediaHeader";
import { MediaCast } from "@/components/media/MediaCast";
import { MediaRelated } from "@/components/media/MediaRelated";
import { MediaDetails } from "@/lib/tmdb";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface MediaContentProps {
  media: MediaDetails;
  title: string;
  year: string;
  favorite: boolean;
  onFavoriteClick: () => void;
}

export function MediaContent({ 
  media, 
  title, 
  year, 
  favorite, 
  onFavoriteClick 
}: MediaContentProps) {
  return (
    <div className="animate-fade-up space-y-8">
      <MediaHeader
        title={title}
        year={year}
        status={media.status}
        backdropPath={media.backdrop_path}
        onFavoriteClick={onFavoriteClick}
        isFavorite={favorite}
      />

      <div className="flex flex-wrap gap-4 items-center">
        {media.certification && (
          <Badge variant="secondary" className="text-sm">
            {media.certification}
          </Badge>
        )}
        {media.aggregate_rating && (
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">
              {media.aggregate_rating.ratingValue.toFixed(1)}/10
            </span>
            <span className="text-muted-foreground">
              ({media.aggregate_rating.ratingCount.toLocaleString()} ratings)
            </span>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <MediaOverview
          overview={media.overview}
          runtime={media.runtime}
          numberOfSeasons={media.number_of_seasons}
          numberOfEpisodes={media.number_of_episodes}
        />
        
        {media.media_type === "tv" && media.seasons && (
          <MediaSeasons seasons={media.seasons} />
        )}

        {media.credits && (
          <MediaCast
            cast={media.credits.cast}
            crew={media.credits.crew}
          />
        )}
        
        {media.similar && (
          <MediaRelated 
            media={media.similar} 
            title={title}
          />
        )}
      </div>

      {(media.watch_providers || media.pricing) && (
        <MediaProviders 
          providers={media.watch_providers} 
          pricing={media.pricing}
        />
      )}
    </div>
  );
}