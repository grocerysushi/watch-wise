import { CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Media } from "@/lib/tmdb";

interface SearchResultsProps {
  isLoading: boolean;
  results?: Media[];
  onSelect: (mediaType: string, id: number) => void;
  query: string;
}

export function SearchResults({ isLoading, results, onSelect, query }: SearchResultsProps) {
  if (!query) {
    return null;
  }

  if (isLoading) {
    return (
      <CommandGroup heading="Results">
        <CommandItem disabled>Loading...</CommandItem>
      </CommandGroup>
    );
  }

  if (!results || results.length === 0) {
    return <CommandEmpty>No results found.</CommandEmpty>;
  }

  return (
    <CommandGroup heading="Results">
      {results.map((item) => (
        <CommandItem
          key={`${item.media_type}-${item.id}`}
          value={`${item.title || item.name}-${item.id}`}
          onSelect={() => onSelect(item.media_type, item.id)}
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
  );
}