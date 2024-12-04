import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { MediaCard } from "@/components/MediaCard";

const Index = () => {
  const { data: trending, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return (
    <main className="container min-h-screen pt-24 pb-8 animate-fade-up">
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trending This Week
          </h1>
          <p className="text-muted-foreground">
            Discover the most popular shows and movies of the week.
          </p>
        </header>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
                />
              ))
            : trending?.map((media) => (
                <MediaCard key={media.id} media={media} />
              ))}
        </section>
      </div>
    </main>
  );
};

export default Index;