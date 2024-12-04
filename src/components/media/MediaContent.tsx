import { MediaOverview } from "@/components/media/MediaOverview";
import { MediaSeasons } from "@/components/media/MediaSeasons";
import { MediaProviders } from "@/components/media/MediaProviders";
import { MediaHeader } from "@/components/media/MediaHeader";
import { MediaDetails } from "@/lib/tmdb";

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

      {media.watch_providers && (
        <MediaProviders providers={media.watch_providers} />
      )}
    </div>
  );
}