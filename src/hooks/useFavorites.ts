import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
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

  const toggleFavorite = useMutation({
    mutationFn: async ({
      mediaId,
      mediaType,
    }: {
      mediaId: number;
      mediaType: string;
    }) => {
      if (!user) {
        throw new Error("Must be logged in");
      }

      const isFavorite = favorites.some(
        (f) => f.media_id === mediaId && f.media_type === mediaType
      );

      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .match({ user_id: user.id, media_id: mediaId, media_type: mediaType });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          media_id: mediaId,
          media_type: mediaType,
        });
        if (error) throw error;
      }
    },
    onSuccess: (_, { mediaId, mediaType }) => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      const isFavorite = favorites.some(
        (f) => f.media_id === mediaId && f.media_type === mediaType
      );
      toast(isFavorite ? "Removed from favorites" : "Added to favorites");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  const isFavorite = (mediaId: number, mediaType: string) =>
    favorites.some((f) => f.media_id === mediaId && f.media_type === mediaType);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};