import { MediaDetails } from '../types/media';
import { API_KEY, BASE_URL } from './tmdbCommon';

export async function getTvDetails(id: number): Promise<MediaDetails> {
  console.log(`Fetching details for TV show ${id}`);
  
  const [detailsResponse, providersResponse, creditsResponse, ratingsResponse, similarResponse] = await Promise.all([
    fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,seasons`),
    fetch(`${BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/tv/${id}/content_ratings?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`)
  ]);

  const [details, providers, credits, ratings, similar] = await Promise.all([
    detailsResponse.json(),
    providersResponse.json(),
    creditsResponse.json(),
    ratingsResponse.json(),
    similarResponse.json()
  ]);

  // If it's a TV show, fetch episodes for each season
  let seasons = details.seasons;
  if (seasons) {
    console.log('Fetching season details for TV show');
    const seasonsWithEpisodes = await Promise.all(
      seasons.map(async (season: any) => {
        try {
          const seasonResponse = await fetch(
            `${BASE_URL}/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`
          );
          const seasonData = await seasonResponse.json();
          return {
            ...season,
            episodes: seasonData.episodes || []
          };
        } catch (error) {
          console.error(`Error fetching season ${season.season_number}:`, error);
          return season;
        }
      })
    );
    seasons = seasonsWithEpisodes;
  }

  // Process content ratings
  const contentRatings = ratings.results || [];
  const usRating = contentRatings.find((r: any) => r.iso_3166_1 === 'US');
  const certification = usRating?.rating;

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

  // Process similar shows
  const similarMedia = similar.results?.map((show: any) => ({
    ...show,
    media_type: "tv" as const,
  }));

  return {
    ...details,
    media_type: "tv",
    watch_providers: providers.results?.US,
    credits,
    certification,
    aggregate_rating: aggregateRating,
    pricing,
    seasons,
    similar: similarMedia
  };
}