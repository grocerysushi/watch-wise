import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface WatchedEntry {
  id: string;
  user_id: string;
  media_id: number;
  media_type: string;
  episode_number?: number | null;
  season_number?: number | null;
  watched_at: string;
}

export function useWatched() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: watchedEntries = [] } = useQuery({
    queryKey: ["watched", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("watched")
        .select("*")
        .order("watched_at", { ascending: false });

      if (error) {
        console.error("Error fetching watched entries:", error);
        throw error;
      }
      return data as WatchedEntry[];
    },
    enabled: !!user,
  });

  const toggleWatched = useMutation({
    mutationFn: async ({ 
      mediaId, 
      mediaType, 
      episodeNumber, 
      seasonNumber 
    }: { 
      mediaId: number; 
      mediaType: string;
      episodeNumber?: number;
      seasonNumber?: number;
    }) => {
      if (!user) throw new Error("User not authenticated");

      const existing = watchedEntries.find(
        (w) => w.media_id === mediaId && 
              w.media_type === mediaType && 
              w.episode_number === episodeNumber && 
              w.season_number === seasonNumber
      );

      if (existing) {
        const { error } = await supabase
          .from("watched")
          .delete()
          .match({ 
            user_id: user.id, 
            media_id: mediaId, 
            media_type: mediaType,
            episode_number: episodeNumber,
            season_number: seasonNumber
          });

        if (error) throw error;
        return { type: "removed" as const };
      } else {
        const { error } = await supabase.from("watched").insert({
          user_id: user.id,
          media_id: mediaId,
          media_type: mediaType,
          episode_number: episodeNumber,
          season_number: seasonNumber,
        });

        if (error) throw error;
        return { type: "added" as const };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["watched"] });
      toast.success(
        result.type === "added" ? "Marked as watched" : "Marked as unwatched"
      );
    },
    onError: (error) => {
      console.error("Error toggling watched status:", error);
      toast.error("Failed to update watched status");
    },
  });

  const isWatched = (
    mediaId: number, 
    mediaType: string,
    episodeNumber?: number,
    seasonNumber?: number
  ) => {
    return watchedEntries.some(
      (w) => w.media_id === mediaId && 
            w.media_type === mediaType &&
            w.episode_number === episodeNumber && 
            w.season_number === seasonNumber
    );
  };

  return {
    watchedEntries,
    toggleWatched,
    isWatched,
  };
}