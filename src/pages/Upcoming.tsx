import { useQuery } from "@tanstack/react-query";
import { MediaCard } from "@/components/MediaCard";
import { getUpcoming } from "@/lib/tmdb";

const Upcoming = () => {
  const { data: upcoming, isLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcoming,
  });

  return (
    <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Upcoming Movies
          </h1>
          <p className="text-muted-foreground">
            Discover movies coming soon to theaters.
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {upcoming?.map((media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upcoming;