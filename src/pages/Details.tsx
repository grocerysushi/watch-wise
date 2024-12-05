import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMediaDetails } from "@/lib/tmdb";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { MediaContent } from "@/components/media/MediaContent";
import { MediaLoading } from "@/components/media/MediaLoading";
import { Helmet } from "react-helmet";

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
    return <MediaLoading />;
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

  // Create structured data for the movie/TV show
  const structuredData = {
    "@context": "https://schema.org",
    "@type": media.media_type === "movie" ? "Movie" : "TVSeries",
    "name": title,
    "datePublished": date,
    "description": media.overview,
    "image": `https://image.tmdb.org/t/p/original${media.poster_path}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": media.vote_average,
      "bestRating": "10",
      "ratingCount": media.vote_count
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": media.watch_providers?.flatrate?.map(provider => ({
        "@type": "EntryPoint",
        "urlTemplate": `https://www.google.com/search?q=watch+${encodeURIComponent(title)}+on+${encodeURIComponent(provider.provider_name)}`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform"
        ]
      }))
    },
    "duration": media.runtime ? `PT${media.runtime}M` : undefined,
    "numberOfEpisodes": media.number_of_episodes,
    "numberOfSeasons": media.number_of_seasons,
    "contentRating": "TV-14", // You might want to fetch this from TMDB if available
    "genre": media.genres?.map(genre => genre.name),
    "actor": media.credits?.cast?.slice(0, 5)?.map(actor => ({
      "@type": "Person",
      "name": actor.name
    })),
    "director": media.credits?.crew?.filter(crew => crew.job === "Director")?.map(director => ({
      "@type": "Person",
      "name": director.name
    })),
    "provider": media.watch_providers?.flatrate?.map(provider => ({
      "@type": "Organization",
      "name": provider.provider_name,
      "logo": `https://image.tmdb.org/t/p/original${provider.logo_path}`
    }))
  };

  // Meta tags for social sharing and SEO
  const metaTags = {
    title: `${title} (${year}) - Watch Now | Cueious`,
    description: `Watch ${title} on ${media.watch_providers?.flatrate?.map(p => p.provider_name).join(", ") || "streaming services"}. ${media.overview?.slice(0, 150)}...`,
    image: `https://image.tmdb.org/t/p/original${media.backdrop_path || media.poster_path}`,
    url: `https://www.cueious.net/${media.media_type}/${media.id}`
  };

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={metaTags.url} />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.image} />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* Additional SEO meta tags */}
        <link rel="canonical" href={metaTags.url} />
        <meta name="keywords" content={`${title}, ${year}, watch ${title}, stream ${title}, ${media.media_type}, ${media.genres?.map(g => g.name).join(", ")}, streaming, where to watch`} />
      </Helmet>

      <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
        <MediaContent
          media={media}
          title={title}
          year={year.toString()}
          favorite={favorite}
          onFavoriteClick={handleFavoriteClick}
        />
      </div>
    </>
  );
};

export default Details;