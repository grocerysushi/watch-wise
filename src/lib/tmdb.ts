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

export async function getMediaDetails(id: number, type: "movie" | "tv"): Promise<Media> {
  const response = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
}