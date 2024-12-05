import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { MediaCard } from "@/components/MediaCard";
import { Helmet } from "react-helmet";

const Index = () => {
  const { data: trending, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Create structured data for the trending movies/shows
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": trending?.map((item, index) => ({
      "@type": item.media_type === "movie" ? "Movie" : "TVSeries",
      "position": index + 1,
      "name": item.title || item.name,
      "image": `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      "datePublished": item.release_date || item.first_air_date,
      "description": item.overview
    })) || []
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <main className="container min-h-screen pt-24 pb-8 animate-fade-up">
        <div className="space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trending Movies & TV Shows This Week
            </h1>
            <p className="text-muted-foreground max-w-[800px]">
              Discover the most popular shows and movies trending this week. Stay up to date with what everyone's watching and find your next favorite entertainment.
            </p>
          </header>

          <section 
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            aria-label="Trending movies and TV shows"
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
                    aria-hidden="true"
                  />
                ))
              : trending?.map((media) => (
                  <MediaCard 
                    key={media.id} 
                    media={media}
                  />
                ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;