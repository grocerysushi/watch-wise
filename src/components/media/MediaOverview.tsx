import { Clock, Calendar, Play, Monitor } from "lucide-react";

interface MediaOverviewProps {
  overview: string;
  runtime?: number;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
}

export function MediaOverview({ 
  overview, 
  runtime, 
  numberOfSeasons, 
  numberOfEpisodes 
}: MediaOverviewProps) {
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">{overview}</p>
      
      <div className="flex flex-wrap gap-6">
        {runtime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatRuntime(runtime)}</span>
          </div>
        )}
        {numberOfSeasons && (
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            <span>{numberOfSeasons} Seasons</span>
          </div>
        )}
        {numberOfEpisodes && (
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>{numberOfEpisodes} Episodes</span>
          </div>
        )}
      </div>
    </div>
  );
}