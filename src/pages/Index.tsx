import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { MediaCard } from "@/components/MediaCard";
import { Helmet } from "react-helmet";
import { useProfile } from "@/hooks/useProfile";

const getDayContent = () => {
  const today = new Date().getDay();
  switch (today) {
    case 0:
      return "Weekly Trending Movies & TV Shows";
    case 1:
      return "Today's Trending Movies & TV Shows";
    case 2:
      return "Weekly Trending Movies";
    case 3:
      return "Weekly Trending TV Shows";
    case 4:
      return "Today's Trending Movies";
    case 5:
      return "Today's Trending TV Shows";
    case 6:
      return "All-Time Popular Movies & TV Shows";
    default:
      return "Trending Content";
  }
};

const Index = () => {
  const { data: trending, isLoading } = useQuery({
    queryKey: ["trending", new Date().toDateString()], // Update cache key daily
    queryFn: getTrending,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const { profile } = useProfile();
  const dayContent = getDayContent();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cueious - Movie and TV Show Discovery",
    "alternateName": "Cueious",
    "url": "https://www.cueious.net",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.cueious.net/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const trendingListData = {
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

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cueious",
    "url": "https://www.cueious.net",
    "logo": "https://www.cueious.net/lovable-uploads/a89e392b-ac7d-4556-8f41-b064ab664e62.png",
    "sameAs": [
      "https://twitter.com/cueious"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Cueious - Best Movie & TV Show Tracker | Rate, Review & Discover Entertainment</title>
        <meta name="description" content="Track and rate movies & TV shows with Cueious, your personal entertainment companion. Create watchlists, get personalized recommendations, and discover what to watch next. Join our community of movie enthusiasts today!" />
        <meta name="keywords" content="movie tracker app, TV show tracker, what to watch next, movie watchlist, TV series tracker, movie rating app, personal movie database, TV show recommendations, movie collection manager, binge watch planner, entertainment tracking, movie reviews, TV show ratings, streaming guide, watch history" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(trendingListData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
        
        <link rel="canonical" href="https://www.cueious.net" />
      </Helmet>
      
      <main className="container min-h-screen px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 animate-fade-up">
        <div className="space-y-6 sm:space-y-8">
          <header className="space-y-2 sm:space-y-4 text-center sm:text-left max-w-3xl mx-auto sm:mx-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              {profile?.display_name 
                ? `Welcome back, ${profile.display_name}!` 
                : 'Discover and Track Your Entertainment Journey'}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-[800px]">
              {dayContent} - Your personal movie and TV show companion. Rate what you've watched, create watchlists, and get personalized recommendations.
            </p>
          </header>

          <section 
            className="min-h-[200px]"
            aria-label={dayContent}
          >
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {trending?.map((media) => (
                  <MediaCard 
                    key={media.id} 
                    media={media}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;