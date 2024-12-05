import { CastMember, CrewMember } from "@/lib/types/media";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MediaCastProps {
  cast: CastMember[];
  crew: CrewMember[];
}

export function MediaCast({ cast, crew }: MediaCastProps) {
  // Group crew members by department
  const crewByDepartment = crew.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = [];
    }
    acc[member.department].push(member);
    return acc;
  }, {} as Record<string, CrewMember[]>);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Cast & Crew</h2>
      
      {/* Cast Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cast</h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {cast.map((actor) => (
              <div key={actor.id} className="w-[150px] space-y-3">
                <Avatar className="h-[150px] w-[150px] rounded-lg">
                  {actor.profile_path ? (
                    <AvatarImage 
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                      alt={actor.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg text-2xl">
                      {actor.name[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="space-y-1">
                  <p className="font-medium leading-none">{actor.name}</p>
                  <p className="text-sm text-muted-foreground">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Crew Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Crew</h3>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(crewByDepartment).map(([department, members]) => (
            <AccordionItem key={department} value={department}>
              <AccordionTrigger className="text-base">
                {department} ({members.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {members.map((member) => (
                    <div key={`${member.id}-${member.job}`} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        {member.profile_path ? (
                          <AvatarImage 
                            src={`https://image.tmdb.org/t/p/w185${member.profile_path}`} 
                            alt={member.name} 
                          />
                        ) : (
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-medium leading-none">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.job}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}