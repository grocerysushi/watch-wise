import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMediaDetails } from "@/lib/tmdb";

const Details = () => {
  const { type, id } = useParams();
  
  const { data: media, isLoading } = useQuery({
    queryKey: ["media", id, type],
    queryFn: () => getMediaDetails(Number(id), type as "movie" | "tv"),
    enabled: !!id && !!type,
  });

  if (isLoading) {
    return (
      <div className="container min-h-screen pt-24 pb-8">
        <div className="h-[400px] animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!media) return null;

  const title = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const year = date ? new Date(date).getFullYear() : "";

  return (
    <div className="container min-h-screen pt-24 pb-8 animate-fade-up">
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
        <img
          src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-xl text-muted-foreground">{year}</p>
        </div>
      </div>
      <p className="text-lg leading-relaxed">{media.overview}</p>
    </div>
  );
};

export default Details;