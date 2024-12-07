import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => {
      console.log("Searching for:", query);
      return searchMedia(query);
    },
    enabled: query.length > 0,
  });

  console.log("Search results:", results);
  console.log("Is loading:", isLoading);

  const handleSelect = (mediaType: string, id: number, title: string) => {
    console.log("Selected item:", { mediaType, id, title });
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    navigate(`/${mediaType}/${id}/${slug}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Search movies and TV shows</DialogTitle>
      <CommandInput 
        placeholder="Search movies & TV shows..." 
        value={query}
        onValueChange={(value) => {
          console.log("Input value changed:", value);
          setQuery(value);
        }}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {query.length === 0 && (
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                navigate("/");
                toast("Navigated to home");
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                navigate("/upcoming");
                toast("Navigated to upcoming");
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Upcoming</span>
            </CommandItem>
          </CommandGroup>
        )}
        {query.length > 0 && !isLoading && results && (
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