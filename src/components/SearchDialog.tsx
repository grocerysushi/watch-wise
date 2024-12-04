import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchMedia } from "@/lib/tmdb";
import { useToast } from "@/components/ui/use-toast";
import { DialogTitle } from "@/components/ui/dialog";

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
    queryFn: () => searchMedia(query),
    enabled: query.length > 0,
  });

  const handleSelect = (mediaType: string, id: number) => {
    setOpen(false);
    setQuery("");
    navigate(`/${mediaType}/${id}`);
    toast({
      description: "Press ⌘K to search again",
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search movies & TV...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search movies and TV shows</DialogTitle>
        <CommandInput
          placeholder="Search movies & TV shows..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {query.length > 0 && (
            <CommandGroup heading="Results">
              {isLoading ? (
                <CommandItem disabled>Loading...</CommandItem>
              ) : (
                results?.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.media_type, item.id)}
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
                          {new Date(
                            item.release_date || item.first_air_date
                          ).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}