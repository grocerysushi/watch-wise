import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMediaDetails } from "@/lib/tmdb";
import { Clock, Calendar, Play, Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  const providers = media.watch_providers;

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
        <img
          src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{media.status}</Badge>
            <p className="text-xl text-muted-foreground">{year}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[2fr,1fr] gap-8">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">{media.overview}</p>
          
          <div className="flex flex-wrap gap-6">
            {media.runtime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatRuntime(media.runtime)}</span>
              </div>
            )}
            {media.number_of_seasons && (
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span>{media.number_of_seasons} Seasons</span>
              </div>
            )}
            {media.number_of_episodes && (
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span>{media.number_of_episodes} Episodes</span>
              </div>
            )}
          </div>
        </div>

        {providers && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Where to Watch</h2>
            {providers.flatrate && (
              <div className="space-y-2">
                <h3 className="font-medium">Stream</h3>
                <div className="flex flex-wrap gap-2">
                  {providers.flatrate.map((provider) => (
                    <img
                      key={provider.provider_name}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            {providers.rent && (
              <div className="space-y-2">
                <h3 className="font-medium">Rent</h3>
                <div className="flex flex-wrap gap-2">
                  {providers.rent.map((provider) => (
                    <img
                      key={provider.provider_name}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            {providers.buy && (
              <div className="space-y-2">
                <h3 className="font-medium">Buy</h3>
                <div className="flex flex-wrap gap-2">
                  {providers.buy.map((provider) => (
                    <img
                      key={provider.provider_name}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;