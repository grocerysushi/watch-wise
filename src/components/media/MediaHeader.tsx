import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MediaHeaderProps {
  title: string;
  year: string;
  status: string;
  backdropPath: string;
}

export function MediaHeader({ title, year, status, backdropPath }: MediaHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
        <img
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{status}</Badge>
            <p className="text-xl text-muted-foreground">{year}</p>
          </div>
        </div>
      </div>
    </>
  );
}