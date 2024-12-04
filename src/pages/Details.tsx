import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMediaDetails } from "@/lib/tmdb";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { MediaContent } from "@/components/media/MediaContent";
import { MediaLoading } from "@/components/media/MediaLoading";

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

  return (
    <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
      <MediaContent
        media={media}
        title={title}
        year={year.toString()}
        favorite={favorite}
        onFavoriteClick={handleFavoriteClick}
      />
    </div>
  );
};

export default Details;