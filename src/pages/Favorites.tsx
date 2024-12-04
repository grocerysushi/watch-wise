import { useQuery } from "@tanstack/react-query";
import { MediaCard } from "@/components/MediaCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Media } from "@/lib/tmdb";

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data: favoritesI'll create a new "Favorites" page where users can view all their favorited movies and TV shows.

<lov-code>
First, let's create a new Favorites page component:

<lov-write file_path="src/pages/Favorites.tsx">
import { useQuery } from "@tanstack/react-query";
import { MediaCard } from "@/components/MediaCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMediaDetails } from "@/lib/tmdb";

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("media_id, media_type");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: mediaItems = [], isLoading: isLoadingMedia } = useQuery({
    queryKey: ["favorites-details", favorites],
    queryFn: async () => {
      const details = await Promise.all(
        favorites.map((fav) => 
          getMediaDetails(fav.media_id, fav.media_type as "movie" | "tv")
        )
      );
      return details;
    },
    enabled: favorites.length > 0,
  });

  if (isLoading || isLoadingMedia) {
    return (
      <div className="container min-h-screen pt-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen pt-24">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      {mediaItems.length === 0 ? (
        <p className="text-muted-foreground">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mediaItems.map((media) => (
            <MediaCard key={`${media.media_type}-${media.id}`} media={media} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;