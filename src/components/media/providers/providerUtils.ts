const providerUrls = {
  "Netflix": "https://www.netflix.com",
  "Prime Video": "https://www.amazon.com/Prime-Video",
  "Amazon Prime Video": "https://www.amazon.com/Prime-Video",
  "Disney Plus": "https://www.disneyplus.com",
  "Hulu": "https://www.hulu.com",
  "HBO Max": "https://www.max.com",
  "Apple TV Plus": "https://tv.apple.com",
  "Paramount Plus": "https://www.paramountplus.com",
  "Peacock": "https://www.peacocktv.com",
  "Crunchyroll": "https://www.crunchyroll.com",
  "Vudu": "https://www.vudu.com",
  "Google Play Movies": "https://play.google.com/store/movies",
  "YouTube": "https://www.youtube.com",
  "Microsoft Store": "https://www.microsoft.com/en-us/store/movies-and-tv",
} as const;

type ProviderName = keyof typeof providerUrls;

export const handleProviderClick = (providerName: string) => {
  const url = providerUrls[providerName as ProviderName] || 
    `https://www.google.com/search?q=watch+on+${encodeURIComponent(providerName)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};