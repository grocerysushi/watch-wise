import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMedia } from "@/lib/api/tmdbCommon";
import { Media } from "@/lib/types/media";
import { DialogTitle } from "@/components/ui/dialog";

let showSearchCommand: (() => void) | null = null;

export function openSearch() {
  if (showSearchCommand) {
    showSearchCommand();
  }
}

export function SearchCommand() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    showSearchCommand = () => setOpen(true);
    return () => {
      showSearchCommand = null;
    };
  }, []);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      console.log("Searching for:", query);
      if (!query) return [];
      const data = await searchMedia(query);
      console.log("Search API response:", data);
      return data;
    },
    enabled: query.length > 0,
  });

  console.log("Current query:", query);
  console.log("Search results:", results);

  const handleSelect = (mediaType: string, id: number, title: string) => {
    console.log("Selected item:", { mediaType, id, title });
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    navigate(`/${mediaType}/${id}/${slug}`);
    setOpen(false);
  };

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={setOpen}
      aria-label="Search movies and TV shows"
    >
      <DialogTitle className="sr-only">Search movies and TV shows</DialogTitle>
      <div id="search-dialog-description" className="sr-only">
        Search for movies and TV shows by title
      </div>
      <CommandInput 
        placeholder="Search movies & TV shows..." 
        value={query}
        onValueChange={(value) => {
          console.log("Input value changed:", value);
          setQuery(value);
        }}
        aria-describedby="search-dialog-description"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {query.length === 0 ? (
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                navigate("/");
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                navigate("/upcoming");
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Upcoming</span>
            </CommandItem>
          </CommandGroup>
        ) : null}
        {query.length > 0 && !isLoading && results && results.length > 0 && (
          <CommandGroup heading="Search Results">
            {results.map((item: Media) => (
              <CommandItem
                key={`${item.media_type}-${item.id}`}
                onSelect={() => handleSelect(
                  item.media_type, 
                  item.id, 
                  item.title || item.name || ""
                )}
                className="flex items-center gap-2 p-2"
              >
                <div className="flex items-center gap-2">
                  {item.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={item.title || item.name}
                      className="h-12 w-8 rounded object-cover"
                    />
                  ) : (
                    <div className="h-12 w-8 rounded bg-muted" />
                  )}
                  <div>
                    <p className="font-medium">{item.title || item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.media_type === "movie" ? "Movie" : "TV Show"} •{" "}
                      {item.release_date || item.first_air_date
                        ? new Date(
                            item.release_date || item.first_air_date
                          ).getFullYear()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}