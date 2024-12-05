import { Media, MediaDetails } from '../types/media';

const API_KEY = "0516f25de82267acf54e3dd3fc372307";
const BASE_URL = "https://api.themoviedb.org/3";

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
  const [detailsResponse, providersResponse, creditsResponse, ratingsResponse] = await Promise.all([
    fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`),
    fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/${type === 'movie' ? 'release_dates' : 'content_ratings'}?api_key=${API_KEY}`)
  ]);

  const [details, providers, credits, ratings] = await Promise.all([
    detailsResponse.json(),
    providersResponse.json(),
    creditsResponse.json(),
    ratingsResponse.json()
  ]);

  // Process content ratings
  const contentRatings = ratings.results || [];
  const usRating = contentRatings.find((r: any) => r.iso_3166_1 === 'US');
  const certification = type === 'movie' 
    ? usRating?.release_dates?.[0]?.certification 
    : usRating?.rating;

  // Calculate aggregate rating
  const aggregateRating = {
    ratingValue: details.vote_average,
    ratingCount: details.vote_count,
    bestRating: 10,
    worstRating: 0
  };

  // Process pricing from watch providers
  const pricing: PriceInfo[] = [];
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

  return {
    ...details,
    media_type: type,
    watch_providers: providers.results?.US,
    credits,
    certification,
    aggregate_rating: aggregateRating,
    pricing
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