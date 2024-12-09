import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <Button
      variant="outline"
      className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-4 md:w-40 lg:w-64"
      onClick={onClick}
      aria-label="Search movies and TV shows"
    >
      <Search className="mr-2 h-4 w-4" />
      <span className="hidden lg:inline-flex">Search movies & TV...</span>
      <span className="inline-flex lg:hidden">Search...</span>
    </Button>
  );
}