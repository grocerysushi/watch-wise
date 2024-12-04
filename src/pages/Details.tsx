import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMediaDetails } from "@/lib/tmdb";
import { MediaContent } from "@/components/media/MediaContent";
import { MediaLoading } from "@/components/media/MediaLoading";
import { AdComponent } from '@/components/AdComponent';
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";

const Details = () => {
  const { type, id } = useParams();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const { data: media, isLoading } = useQuery({
    queryKey: ["media", type, id],
    queryFn: () => getMediaDetails(type, id),
  });

  const title = media?.title || media?.name;
  const date = media?.release_date || media?.first_air_date;
  const year = date ? new Date(date).getFullYear().toString() : "";
  const favorite = isFavorite(media?.id, media?.media_type);

  const handleFavoriteClick = () => {
    if (user) {
      toggleFavorite.mutate({
        mediaId: media?.id,
        mediaType: media?.media_type,
      });
    }
  };

  return (
    <main className="container min-h-screen pt-24 pb-8">
      {isLoading ? (
        <MediaLoading />
      ) : media ? (
        <>
          <MediaContent
            media={media}
            title={title}
            year={year}
            favorite={favorite}
            onFavoriteClick={handleFavoriteClick}
          />
          <AdComponent slot="YOUR-AD-SLOT-ID" />
        </>
      ) : (
        <div>Media not found</div>
      )}
    </main>
  );
};

export default Details;
