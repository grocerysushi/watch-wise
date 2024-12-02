import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMediaDetails } from "@/lib/tmdb";
import { Badge } from "@/components/ui/badge";
import { MediaHeader } from "@/components/media/MediaHeader";
import { MediaOverview } from "@/components/media/MediaOverview";
import { MediaSeasons } from "@/components/media/MediaSeasons";
import { MediaProviders } from "@/components/media/MediaProviders";

const Details = () => {
  const { type, id } = useParams();
  
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

  return (
    <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
      <MediaHeader
        title={title}
        year={year.toString()}
        status={media.status}
        backdropPath={media.backdrop_path}
      />

      <div className="grid md:grid-cols-[2fr,1fr] gap-8">
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
    </div>
  );
};

export default Details;