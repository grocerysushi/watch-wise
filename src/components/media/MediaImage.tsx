import { ImageIcon } from "lucide-react";

interface MediaImageProps {
  posterPath: string | null;
  title: string;
  onError: () => void;
  hasError: boolean;
}

export function MediaImage({ posterPath, title, onError, hasError }: MediaImageProps) {
  if (!hasError && posterPath) {
    return (
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={`Poster for ${title}`}
        className="h-full w-full object-cover transition-all group-hover:scale-105"
        loading="lazy"
        width="500"
        height="750"
        decoding="async"
        onError={onError}
      />
    );
  }

  return (
    <div className="h-full w-full bg-muted flex items-center justify-center">
      <div className="text-center p-4 space-y-2">
        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}