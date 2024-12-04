import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command } from "@/components/ui/command";
import { SearchResults } from "@/components/search/SearchResults";
import { useQuery } from "@tanstack/react-query";
import { searchMedia } from "@/lib/tmdb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMedia(query),
    enabled: query.length > 0,
  });

  const handleSelect = (mediaType: string, id: number) => {
    navigate(`/${mediaType}/${id}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0">
        <Command className="rounded-lg border shadow-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 px-4"
            placeholder="Search movies & TV shows..."
          />
          <SearchResults
            query={query}
            results={results}
            isLoading={isLoading}
            onSelect={handleSelect}
          />
        </Command>
      </DialogContent>
    </Dialog>
  );
}