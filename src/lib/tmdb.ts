const API_KEY = "0516f25de82267acf54e3dd3fc372307";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  media_type: "movie" | "tv";
  first_air_date?: string;
  release_date?: string;
  status?: string;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

interface WatchProvider {
  provider_name: string;
  logo_path: string;
}

interface WatchProviders {
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  flatrate?: WatchProvider[];
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
}

interface Season {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_count: number;
  season_number: number;
  episodes?: Episode[];
}

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MediaDetails extends Media {
  watch_providers?: WatchProviders;
  seasons?: Season[];
  vote_count: number;
  genres: Genre[];
  credits: Credits;
}

export async function searchMedia(query: string): Promise<Media[]> {
  if (!query) return [];
  
  console.log("Making TMDB API call for query:", query);
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      console.error("TMDB API error:", response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("TMDB API response:", data);
    
    const filteredResults = data.results.filter((item: any) => 
      (item.media_type === 'movie' || item.media_type === 'tv') && 
      (item.title || item.name)
    );
    
    console.log("Filtered results:", filteredResults);
    return filteredResults;
  } catch (error) {
    console.error('TMDB API search error:', error);
    throw error;
  }
}

export async function getTrending(): Promise<Media[]> {
  const response = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data.results;
}

export async function getMediaDetails(id: number, type: "movie" | "tv"): Promise<MediaDetails> {
  const [detailsResponse, providersResponse, creditsResponse] = await Promise.all([
    fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`),
    fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`)
  ]);

  const [details, providers, credits] = await Promise.all([
    detailsResponse.json(),
    providersResponse.json(),
    creditsResponse.json()
  ]);

  if (type === "tv" && details.seasons) {
    const seasonPromises = details.seasons.map(async (season: Season) => {
      const seasonResponse = await fetch(
        `${BASE_URL}/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`
      );
      const seasonData = await seasonResponse.json();
      return seasonData;
    });

    const seasons = await Promise.all(seasonPromises);
    details.seasons = seasons;
  }

  return {
    ...details,
    media_type: type,
    watch_providers: providers.results?.US,
    credits: credits
  };
}

export async function getUpcoming(): Promise<Media[]> {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&region=US`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data.results.map((movie: any) => ({
    ...movie,
    media_type: "movie" as const,
  }));
}
