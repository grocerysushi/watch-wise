export * from '../types/media';
export * from './tmdbCommon';
export * from './tmdbMovies';
export * from './tmdbTv';

import { getMovieDetails } from './tmdbMovies';
import { getTvDetails } from './tmdbTv';
import { MediaDetails } from '../types/media';

export async function getMediaDetails(id: number, type: "movie" | "tv"): Promise<MediaDetails> {
  return type === "movie" ? getMovieDetails(id) : getTvDetails(id);
}