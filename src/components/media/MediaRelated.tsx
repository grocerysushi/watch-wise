import { MediaCard } from "@/components/MediaCard";
import { Media } from "@/lib/tmdb";

interface MediaRelatedProps {
  media: Media[];
  title: string;
}

export function MediaRelated({ media, title }: MediaRelatedProps) {
  if (!media?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">More Like {title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {media.slice(0, 5).map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
}