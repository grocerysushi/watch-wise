import { Helmet } from "react-helmet";
import { MediaDetails } from "@/lib/tmdb";

interface MediaSEOProps {
  media: MediaDetails;
  title: string;
  year: string;
}

export function MediaSEO({ media, title, year }: MediaSEOProps) {
  const metaTags = {
    title: `${title} (${year}) - Watch Now | Cueious`,
    description: `Watch ${title} on ${media.watch_providers?.flatrate?.map(p => p.provider_name).join(", ") || "streaming services"}. ${media.overview?.slice(0, 150)}...`,
    image: `https://image.tmdb.org/t/p/original${media.backdrop_path || media.poster_path}`,
    url: `https://www.cueious.net/${media.media_type}/${media.id}`,
    keywords: `${title}, ${year}, ${media.media_type}, ${media.genres?.map(g => g.name).join(", ")}, watch online, streaming, movie review, TV series, entertainment, ${media.watch_providers?.flatrate?.map(p => p.provider_name).join(", ")}`
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": media.media_type === "movie" ? "Movie" : "TVSeries",
    "name": title,
    "datePublished": media.release_date || media.first_air_date,
    "description": media.overview,
    "image": metaTags.image,
    "aggregateRating": media.aggregate_rating || {
      "@type": "AggregateRating",
      "ratingValue": media.vote_average,
      "ratingCount": media.vote_count,
      "bestRating": 10,
      "worstRating": 0
    },
    "genre": media.genres?.map(g => g.name),
    "duration": media.runtime ? `PT${media.runtime}M` : undefined,
    "numberOfSeasons": media.number_of_seasons,
    "numberOfEpisodes": media.number_of_episodes,
    "url": metaTags.url
  };

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <link rel="canonical" href={metaTags.url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={media.media_type === "movie" ? "video.movie" : "video.tv_show"} />
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
    </Helmet>
  );
}