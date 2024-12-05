import { MediaDetails, Media } from '../types/media';
import { API_KEY, BASE_URL } from './tmdbCommon';

export async function getMovieDetails(id: number): Promise<MediaDetails> {
  console.log(`Fetching details for movie ${id}`);
  
  const [detailsResponse, providersResponse, creditsResponse, ratingsResponse, similarResponse] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`),
    fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
  ]);

  const [details, providers, credits, ratings, similar] = await Promise.all([
    detailsResponse.json(),
    providersResponse.json(),
    creditsResponse.json(),
    ratingsResponse.json(),
    similarResponse.json()
  ]);

  // Process content ratings
  const contentRatings = ratings.results || [];
  const usRating = contentRatings.find((r: any) => r.iso_3166_1 === 'US');
  const certification = usRating?.release_dates?.[0]?.certification;

  // Calculate aggregate rating
  const aggregateRating = {
    ratingValue: details.vote_average,
    ratingCount: details.vote_count,
    bestRating: 10,
    worstRating: 0
  };

  // Process pricing from watch providers
  const pricing = [];
  if (providers.results?.US) {
    if (providers.results.US.rent) {
      pricing.push({
        type: 'rent',
        price: 3.99,
        currency: 'USD',
        provider: providers.results.US.rent[0].provider_name
      });
    }
    if (providers.results.US.buy) {
      pricing.push({
        type: 'buy',
        price: 14.99,
        provider: providers.results.US.buy[0].provider_name,
        currency: 'USD'
      });
    }
  }

  // Process similar movies
  const similarMedia = similar.results?.map((movie: any) => ({
    ...movie,
    media_type: "movie" as const,
  }));

  return {
    ...details,
    media_type: "movie",
    watch_providers: providers.results?.US,
    credits,
    certification,
    aggregate_rating: aggregateRating,
    pricing,
    similar: similarMedia
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