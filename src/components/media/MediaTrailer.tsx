import { Video } from "@/lib/types/media";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MediaTrailerProps {
  videos?: {
    results: Video[];
  };
}

export function MediaTrailer({ videos }: MediaTrailerProps) {
  if (!videos?.results?.length) return null;

  // Find the first official trailer, or fallback to any trailer, or any video
  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.official && video.site === "YouTube"
  ) || videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  ) || videos.results[0];

  if (!trailer) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Trailer</h2>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full rounded-lg"
        />
      </AspectRatio>
    </div>
  );
}