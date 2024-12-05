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
    description: `Watch ${title} on ${media.watch_providers?.flatrate?.map(p => p.name).join(", ") || "streaming services"}. ${media.overview?.slice(0, 150)}...`,
    image: `https://image.tmdb.org/t/p/original${media.backdrop_path || media.poster_path}`,
    url: `https://www.cueious.net/${media.media_type}/${media.id}`,
    keywords: `${title}, ${year}, ${media.media_type}, ${media.genres?.map(g => g.name).join(", ")}, watch online, streaming, movie review, TV series, entertainment, ${media.watch_providers?.flatrate?.map(p => p.provider_name).join(", ")}`
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <meta name="language" content="English" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={media.media_type === "movie" ? "video.movie" : "video.tv_show"} />
      <meta property="og:url" content={metaTags.url} />
      <meta property="og:title" content={metaTags.title} />
      <meta property="og:description" content={metaTags.description} />
      <meta property="og:image" content={metaTags.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Cueious" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:video:release_date" content={media.release_date || media.first_air_date} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cueious" />
      <meta name="twitter:creator" content="@cueious" />
      <meta name="twitter:url" content={metaTags.url} />
      <meta name="twitter:title" content={metaTags.title} />
      <meta name="twitter:description" content={metaTags.description} />
      <meta name="twitter:image" content={metaTags.image} />
      <meta name="twitter:image:alt" content={`${title} poster`} />
      <meta name="twitter:label1" content="Available on" />
      <meta name="twitter:data1" content={media.watch_providers?.flatrate?.map(p => p.provider_name).join(", ") || "Streaming Services"} />
      <meta name="twitter:label2" content="Genre" />
      <meta name="twitter:data2" content={media.genres?.map(g => g.name).join(", ")} />

      {/* Canonical URL */}
      <link rel="canonical" href={metaTags.url} />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}