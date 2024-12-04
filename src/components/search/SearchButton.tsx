import { Button } from "@/components/ui/button";

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <Button
      variant="outline"
      className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-4 md:w-40 lg:w-64"
      onClick={onClick}
    >
      <span className="hidden lg:inline-flex">Search movies & TV...</span>
      <span className="inline-flex lg:hidden">Search...</span>
    </Button>
  );
}