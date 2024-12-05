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
  const { type, id } = useParams();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  // Add console logs to track the flow
  console.log("Route params:", { type, id });
  
  const { data: media, isLoading, isError } = useQuery({
    queryKey: ["media", id, type],
    queryFn: async () => {
      if (!id || !type) {
        console.error("Missing required parameters:", { id, type });
        throw new Error("Missing required parameters");
      }

      if (type !== "movie" && type !== "tv") {
        console.error("Invalid media type:", type);
        throw new Error("Invalid media type");
      }

      console.log("Fetching details for:", { type, id });
      const result = await getMediaDetails(Number(id), type as "movie" | "tv");
      console.log("Fetch result:", result);
      return result;
    },
    enabled: Boolean(id) && Boolean(type),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1, // Only retry once to avoid infinite loops
    meta: {
      onSuccess: (data) => {
        updateSitemapEntry(data);
      },
    },
  });

  if (isError) {
    console.error("Error loading media details");
    navigate("/");
    return null;
  }

  if (isLoading || !media) {
    return <MediaLoading />;
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