import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Favorite } from "@/lib/types";

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching favorites:", error);
        throw error;
      }
      return data as Favorite[];
    },
    enabled: !!user,
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({ mediaId, mediaType }: { mediaId: number; mediaType: string }) => {
      if (!user) throw new Error("User not authenticated");

      const existing = favorites.find(
        (f) => f.media_id === mediaId && f.media_type === mediaType
      );

      if (existing) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .match({ user_id: user.id, media_id: mediaId, media_type: mediaType });

        if (error) throw error;
        return { type: "removed" as const };
      } else {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          media_id: mediaId,
          media_type: mediaType,
        });

        if (error) throw error;
        return { type: "added" as const };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(
        result.type === "added" ? "Added to favorites" : "Removed from favorites"
      );
    },
    onError: (error) => {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    },
  });

  const isFavorite = (mediaId: number, mediaType: string) =>
    favorites.some((f) => f.media_id === mediaId && f.media_type === mediaType);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}