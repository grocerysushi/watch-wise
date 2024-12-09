import { Card } from "@/components/ui/card";
import { Media } from "@/lib/tmdb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { MediaFavoriteButton } from "@/components/media/MediaFavoriteButton";

interface MediaCardProps {
  media: Media;
}

export function MediaCard({ media }: MediaCardProps) {
  const title = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const year = date ? new Date(date).getFullYear() : "";
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    toggleFavorite.mutate({
      mediaId: media.id,
      mediaType: media.media_type,
    });
  };

  const favorite = isFavorite(media.id, media.media_type);

  // Create URL-friendly slug from title
  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
  };

  const mediaUrl = `/${media.media_type}/${media.id}/${createSlug(title)}`;

  return (
    <Link to={mediaUrl}>
      <Card className="group relative overflow-hidden transition-all hover:scale-105">
        <div className="aspect-[2/3] overflow-hidden">
          <MediaImage
            posterPath={media.poster_path}
            title={title}
            onError={() => setImageError(true)}
            hasError={imageError}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute bottom-0 p-4 space-y-2">
            <p className="font-semibold text-lg text-white">{title}</p>
            <p className="text-sm text-white/80">{year}</p>
          </div>
        </div>
        <MediaFavoriteButton
          title={title}
          isFavorite={favorite}
          onClick={handleFavoriteClick}
        />
      </Card>
    </Link>
  );
}