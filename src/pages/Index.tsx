import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { MediaCard } from "@/components/MediaCard";
import { Helmet } from "react-helmet";
import { useProfile } from "@/hooks/useProfile";

const Index = () => {
  const { data: trending, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const { profile } = useProfile();

  // Enhanced structured data for better SEO
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
      "https://twitter.com/cueious",
      // Add other social media links when available
    ]
  };

  return (
    <>
      <Helmet>
        <title>Cueious - Best Movie & TV Show Tracker | Discover What to Watch Next</title>
        <meta name="description" content="Discover the best movies and TV shows to watch. Track what you've watched, create watchlists, and get personalized recommendations. Join millions of users on Cueious today!" />
        <meta name="keywords" content="movie tracker, TV show tracker, what to watch, movie recommendations, TV series recommendations, streaming guide, entertainment tracker, watchlist, movie database, TV show database" />
        
        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content="Cueious - Your Ultimate Movie & TV Show Companion" />
        <meta property="og:description" content="Track, discover, and never miss great entertainment. Get personalized movie and TV show recommendations based on what you love." />
        
        {/* Twitter Card tags */}
        <meta name="twitter:title" content="Cueious - Best Movie & TV Show Discovery Platform" />
        <meta name="twitter:description" content="Your personal entertainment guide. Track what you watch, discover new content, and never miss great shows and movies." />
        
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
                : 'Trending Movies & TV Shows This Week'}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-[800px]">
              Discover the most popular shows and movies trending this week. Stay up to date with what everyone's watching and find your next favorite entertainment.
            </p>
          </header>

          <section 
            className="min-h-[200px]"
            aria-label="Trending movies and TV shows"
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