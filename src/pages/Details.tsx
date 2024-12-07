import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getMediaDetails } from "@/lib/tmdb";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useWatched } from "@/hooks/useWatched";
import { MediaContent } from "@/components/media/MediaContent";
import { MediaLoading } from "@/components/media/MediaLoading";
import { MediaSEO } from "@/components/media/MediaSEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { updateSitemapEntry } from "@/lib/seo";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // Determine media type from URL
  const type = window.location.pathname.includes('/tv/') ? 'tv' : 'movie';
  
  console.log("Details page mounted, params:", { type, id });
  
  const { data: media, isLoading, isError } = useQuery({
    queryKey: ["media", id, type],
    queryFn: async () => {
      try {
        if (!id) {
          console.error("Missing ID parameter");
          throw new Error("Missing ID parameter");
        }

        console.log("Fetching details for:", { type, id });
        const result = await getMediaDetails(Number(id), type);
        console.log("Fetch result:", result);
        
        // Update sitemap after successful fetch
        updateSitemapEntry(result);
        
        return result;
      } catch (error) {
        console.error("Error fetching media details:", error);
        throw error;
      }
    },
    enabled: Boolean(id),
  });

  // Handle error state
  if (isError) {
    console.error("Error in Details page");
    navigate("/");
    return null;
  }

  // Handle loading state
  if (isLoading || !media) {
    console.log("Loading state in Details page");
    return <MediaLoading />;
  }

  const title = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const year = date ? new Date(date).getFullYear().toString() : "";
  const favorite = isFavorite(media.id, media.media_type);
  const { toggleWatched, isWatched } = useWatched();
  const watched = isWatched(Number(id), type);

  const breadcrumbItems = [
    {
      label: media.media_type === "movie" ? "Movies" : "TV Shows",
      href: `/${media.media_type}s`
    },
    {
      label: title,
      href: `/${media.media_type}/${media.id}`
    }
  ];

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

  const handleWatchedClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWatched.mutate({
      mediaId: Number(id),
      mediaType: type,
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
          watched={watched}
          onFavoriteClick={handleFavoriteClick}
          onWatchedClick={handleWatchedClick}
        />
      </div>
    </>
  );
};

export default Details;