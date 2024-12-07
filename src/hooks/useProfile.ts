import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { UserProfile } from "@/lib/types";

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) {
        console.log("No user found, returning null");
        return null;
      }

      console.log("Making Supabase query for user ID:", user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        // Log the error details for debugging
        console.error("Error fetching profile:", error);
        // Don't throw the error, return null instead
        return null;
      }

      console.log("Profile data received:", data);
      return data as UserProfile;
    },
    enabled: !!user,
    retry: false, // Don't retry on failure
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!user) throw new Error("User not authenticated");

      console.log("Updating profile for user:", user.id, "with:", updates);

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    },
  });

  return {
    profile,
    isLoading,
    updateProfile,
  };
}