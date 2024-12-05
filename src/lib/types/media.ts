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

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface ContentRating {
  iso_3166_1: string;
  rating: string;
}

export interface WatchProvider {
  provider_name: string;
  logo_path: string;
}

export interface WatchProviders {
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  flatrate?: WatchProvider[];
}

export interface PriceInfo {
  type: 'rent' | 'buy';
  price: number;
  currency: string;
  provider: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
}

export interface Season {
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
  vote_count: number;
  genres: Genre[];
  credits: Credits;
  content_ratings?: ContentRating[];
  certification?: string;
  aggregate_rating?: {
    ratingValue: number;
    ratingCount: number;
    bestRating: number;
    worstRating: number;
  };
  pricing?: PriceInfo[];
}