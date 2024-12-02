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
              <img
                key={provider.provider_name}
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
                className="w-12 h-12 rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
      {providers.rent && (
        <div className="space-y-2">
          <h3 className="font-medium">Rent</h3>
          <div className="flex flex-wrap gap-2">
            {providers.rent.map((provider) => (
              <img
                key={provider.provider_name}
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
                className="w-12 h-12 rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
      {providers.buy && (
        <div className="space-y-2">
          <h3 className="font-medium">Buy</h3>
          <div className="flex flex-wrap gap-2">
            {providers.buy.map((provider) => (
              <img
                key={provider.provider_name}
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
                className="w-12 h-12 rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}