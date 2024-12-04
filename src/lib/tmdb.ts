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

export interface MediaDetails extends Media {
  watch_providers?: WatchProviders;
  seasons?: Season[];
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
  const [detailsResponse, providersResponse] = await Promise.all([
    fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`)
  ]);

  const details = await detailsResponse.json();
  const providers = await providersResponse.json();

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
    watch_providers: providers.results?.US
  };
}

export async function searchMedia(query: string): Promise<Media[]> {
  if (!query) return [];
  
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.filter((item: any) => 
      (item.media_type === 'movie' || item.media_type === 'tv') && 
      item.poster_path && 
      (item.title || item.name)
    );
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}