import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getMediaDetails } from "@/lib/tmdb";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { MediaContent } from "@/components/media/MediaContent";
import { MediaLoading } from "@/components/media/MediaLoading";
import { MediaSEO } from "@/components/media/MediaSEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { updateSitemapEntry } from "@/lib/seo";

const Details = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // Determine media type from URL and ensure it's valid
  const mediaType = window.location.pathname.includes('/tv/') ? 'tv' : 'movie';
  const mediaId = id ? parseInt(id, 10) : null;
  
  console.log("Details page mounted", { mediaType, mediaId, slug });
  
  const { data: media, isLoading, isError } = useQuery({
    queryKey: ["media", mediaId, mediaType],
    queryFn: async () => {
      if (!mediaId) {
        console.error("Invalid media ID");
        throw new Error("Invalid media ID");
      }

      try {
        console.log("Fetching media details:", { mediaType, mediaId });
        const result = await getMediaDetails(mediaId, mediaType);
        console.log("Media details fetched:", result);
        
        // Update sitemap after successful fetch
        updateSitemapEntry(result);
        
        return result;
      } catch (error) {
        console.error("Error fetching media details:", error);
        throw error;
      }
    },
    enabled: Boolean(mediaId),
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorHandler: () => {
        console.error("Redirecting to 404 due to error");
        navigate("/404", { replace: true });
      }
    }
  });

  // Handle loading state
  if (isLoading || !media) {
    console.log("Loading media details...");
    return <MediaLoading />;
  }

  // Handle error state
  if (isError) {
    console.error("Error loading media details");
    return null; // The error handler in meta will handle navigation
  }

  const title = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const year = date ? new Date(date).getFullYear().toString() : "";
  const favorite = isFavorite(media.id, media.media_type);

  const breadcrumbItems = [
    {
      label: media.media_type === "movie" ? "Movies" : "TV Shows",
      href: `/${media.media_type}s`
    },
    {
      label: title,
      href: `/${media.media_type}/${media.id}/${slug}`
    }
  ];

  const handleFavoriteClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleFavorite.mutate({
      mediaId: media.id,
      mediaType: media.media_type,
    });
  };

  return (
    <>
      <MediaSEO 
        media={media}
        title={title}
        year={year}
      />

      <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
        <Breadcrumbs items={breadcrumbItems} />
        <MediaContent
          media={media}
          title={title}
          year={year}
          favorite={favorite}
          onFavoriteClick={handleFavoriteClick}
        />
      </div>
    </>
  );
};

export default Details;