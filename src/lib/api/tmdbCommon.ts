import { Media } from '../types/media';

export const API_KEY = "0516f25de82267acf54e3dd3fc372307";
export const BASE_URL = "https://api.themoviedb.org/3";

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
  // Get the current day of the week (0-6, where 0 is Sunday)
  const today = new Date().getDay();
  
  // Define time windows based on the day
  const timeWindow = (() => {
    switch (today) {
      case 0: // Sunday
        return 'week'; // Weekly trending
      case 1: // Monday
        return 'day'; // Daily trending
      case 2: // Tuesday
        return 'week'; // Weekly trending movies only
      case 3: // Wednesday
        return 'week'; // Weekly trending TV shows only
      case 4: // Thursday
        return 'day'; // Daily trending movies only
      case 5: // Friday
        return 'day'; // Daily trending TV shows only
      case 6: // Saturday
        return 'week'; // All-time popular
      default:
        return 'week';
    }
  })();

  // Define media type based on the day
  const mediaType = (() => {
    switch (today) {
      case 2: // Tuesday
      case 4: // Thursday
        return 'movie';
      case 3: // Wednesday
      case 5: // Friday
        return 'tv';
      default:
        return 'all';
    }
  })();

  console.log(`Fetching ${timeWindow} trending ${mediaType} content`);

  const response = await fetch(
    `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data.results;
}