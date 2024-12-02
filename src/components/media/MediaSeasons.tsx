import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Season {
  id: number;
  name: string;
  air_date: string;
  episodes?: Array<{
    id: number;
    name: string;
    episode_number: number;
    air_date: string;
    overview: string;
  }>;
}

interface MediaSeasonsProps {
  seasons: Season[];
}

export function MediaSeasons({ seasons }: MediaSeasonsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
      <Accordion type="single" collapsible className="w-full">
        {seasons.map((season) => (
          <AccordionItem key={season.id} value={`season-${season.id}`}>
            <AccordionTrigger className="text-lg">
              {season.name} ({formatDate(season.air_date)})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {season.episodes?.map((episode) => (
                  <div
                    key={episode.id}
                    className="p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-medium">
                          Episode {episode.episode_number}: {episode.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(episode.air_date)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{episode.overview}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}