import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CommandDialog, CommandInput, CommandList } from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { searchMedia } from "@/lib/tmdb";
import { SearchButton } from "./search/SearchButton";
import { SearchResults } from "./search/SearchResults";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return [];
      const results = await searchMedia(query);
      return results;
    },
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });

  const handleSelect = React.useCallback((mediaType: string, id: number) => {
    setOpen(false);
    setQuery("");
    navigate(`/${mediaType}/${id}`);
    toast({
      description: "Press the search button to search again",
    });
  }, [navigate, toast]);

  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      <CommandDialog 
        open={open} 
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setQuery("");
          }
        }}
      >
        <DialogTitle className="sr-only">Search movies and TV shows</DialogTitle>
        <CommandInput
          placeholder="Search movies & TV shows..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <SearchResults
            isLoading={isLoading}
            results={results}
            onSelect={handleSelect}
            query={query}
          />
        </CommandList>
      </CommandDialog>
    </>
  );
}