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

export interface MediaDetails extends Media {
  watch_providers?: WatchProviders;
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

  return {
    ...details,
    media_type: type,
    watch_providers: providers.results?.US
  };
}