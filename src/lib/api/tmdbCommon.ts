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
    
    if (!data.results) {
      console.error("No results in TMDB API response");
      return [];
    }
    
    const filteredResults = data.results.filter((item: any) => 
      (item.media_type === 'movie' || item.media_type === 'tv') && 
      (item.title || item.name)
    );
    
    console.log("Filtered results:", filteredResults);
    return filteredResults;
  } catch (error) {
    console.error('TMDB API search error:', error);
    throw error; // Let's throw the error to handle it in the UI
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