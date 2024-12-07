export * from '../types/media';
export * from './tmdbCommon';
export * from './tmdbMovies';
export * from './tmdbTv';

import { getMovieDetails } from './tmdbMovies';
import { getTvDetails } from './tmdbTv';
import { MediaDetails } from '../types/media';

export async function getMediaDetails(id: number, type: "movie" | "tv"): Promise<MediaDetails> {
  console.log(`Fetching details for ${type} ${id}`);
  const result = type === "movie" ? await getMovieDetails(id) : await getTvDetails(id);
  console.log(`Got ${type} details:`, result);
  return result;
}