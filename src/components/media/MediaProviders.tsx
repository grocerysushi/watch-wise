interface Provider {
  provider_name: string;
  logo_path: string;
}

interface WatchProviders {
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

interface MediaProvidersProps {
  providers: WatchProviders;
}

const providerUrls: { [key: string]: string } = {
  "Netflix": "https://www.netflix.com",
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
};

const handleProviderClick = (providerName: string) => {
  const url = providerUrls[providerName] || `https://www.google.com/search?q=watch+on+${encodeURIComponent(providerName)}`;
  window.open(url, '_blank');
};

export function MediaProviders({ providers }: MediaProvidersProps) {
  if (!providers) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Where to Watch</h2>
      {providers.flatrate && (
        <div className="space-y-2">
          <h3 className="font-medium">Stream</h3>
          <div className="flex flex-wrap gap-2">
            {providers.flatrate.map((provider) => (
              <button
                key={provider.provider_name}
                onClick={() => handleProviderClick(provider.provider_name)}
                className="transition-transform hover:scale-110 focus:outline-none"
                title={`Watch on ${provider.provider_name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12 h-12 rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      {providers.rent && (
        <div className="space-y-2">
          <h3 className="font-medium">Rent</h3>
          <div className="flex flex-wrap gap-2">
            {providers.rent.map((provider) => (
              <button
                key={provider.provider_name}
                onClick={() => handleProviderClick(provider.provider_name)}
                className="transition-transform hover:scale-110 focus:outline-none"
                title={`Rent on ${provider.provider_name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12 h-12 rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      {providers.buy && (
        <div className="space-y-2">
          <h3 className="font-medium">Buy</h3>
          <div className="flex flex-wrap gap-2">
            {providers.buy.map((provider) => (
              <button
                key={provider.provider_name}
                onClick={() => handleProviderClick(provider.provider_name)}
                className="transition-transform hover:scale-110 focus:outline-none"
                title={`Buy on ${provider.provider_name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12 h-12 rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}