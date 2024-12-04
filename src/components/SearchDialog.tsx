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

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      console.log("Searching for:", query);
      const results = await searchMedia(query);
      console.log("Search results:", results);
      return results;
    },
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });

  const handleSelect = (mediaType: string, id: number) => {
    setOpen(false);
    setQuery("");
    navigate(`/${mediaType}/${id}`);
    toast({
      description: "Press ⌘K to search again",
    });
  };

  const handleQueryChange = (newQuery: string) => {
    console.log("Query changed to:", newQuery);
    setQuery(newQuery);
  };

  // Reset query when dialog is closed
  React.useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search movies and TV shows</DialogTitle>
        <CommandInput
          placeholder="Search movies & TV shows..."
          value={query}
          onValueChange={handleQueryChange}
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