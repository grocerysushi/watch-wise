import { CastMember, CrewMember } from "@/lib/types/media";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MediaCastProps {
  cast: CastMember[];
  directors: CrewMember[];
}

export function MediaCast({ cast, directors }: MediaCastProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Cast & Crew</h2>
      
      {directors.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Director{directors.length > 1 ? 's' : ''}</h3>
          <div className="flex flex-wrap gap-4">
            {directors.map((director) => (
              <div key={director.id} className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  {director.profile_path ? (
                    <AvatarImage 
                      src={`https://image.tmdb.org/t/p/w185${director.profile_path}`} 
                      alt={director.name} 
                    />
                  ) : (
                    <AvatarFallback>{director.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <span>{director.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Cast</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cast.map((actor) => (
            <div key={actor.id} className="space-y-2">
              <Avatar className="w-16 h-16">
                {actor.profile_path ? (
                  <AvatarImage 
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                    alt={actor.name} 
                  />
                ) : (
                  <AvatarFallback>{actor.name[0]}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{actor.name}</p>
                <p className="text-sm text-muted-foreground">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}