import { Card } from "@/components/ui/card";
import { Media } from "@/lib/tmdb";
import { Link } from "react-router-dom";

interface MediaCardProps {
  media: Media;
}

export function MediaCard({ media }: MediaCardProps) {
  const title = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const year = date ? new Date(date).getFullYear() : "";

  return (
    <Link to={`/${media.media_type}/${media.id}`}>
      <Card className="group relative overflow-hidden transition-all hover:scale-105">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute bottom-0 p-4">
            <p className="font-semibold text-lg text-white">{title}</p>
            <p className="text-sm text-white/80">{year}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}