import { WatchProviders, PriceInfo } from "@/lib/types/media";

interface Provider {
  provider_name: string;
  logo_path: string;
}

interface MediaProvidersProps {
  providers: WatchProviders;
  pricing?: PriceInfo[];
}

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

const handleProviderClick = (providerName: string) => {
  const url = providerUrls[providerName as ProviderName] || 
    `https://www.google.com/search?q=watch+on+${encodeURIComponent(providerName)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

const ProviderSection = ({ 
  title, 
  providers, 
  action 
}: { 
  title: string; 
  providers: Provider[]; 
  action: string;
}) => (
  <div className="space-y-2">
    <h3 className="font-medium">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {providers.map((provider) => (
        <button
          key={provider.provider_name}
          onClick={() => handleProviderClick(provider.provider_name)}
          className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
          title={`${action} on ${provider.provider_name}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
            alt={provider.provider_name}
            className="w-12 h-12 rounded-lg"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  </div>
);

export function MediaProviders({ providers, pricing }: MediaProvidersProps) {
  if (!providers && !pricing) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Where to Watch</h2>
      
      {pricing && pricing.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Pricing</h3>
          <div className="flex flex-wrap gap-4">
            {pricing.map((price, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3"
              >
                <span className="font-medium capitalize">{price.type}:</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency
                  }).format(price.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  on {price.provider}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {providers?.flatrate && (
        <ProviderSection 
          title="Stream" 
          providers={providers.flatrate} 
          action="Stream"
        />
      )}
      {providers?.rent && (
        <ProviderSection 
          title="Rent" 
          providers={providers.rent} 
          action="Rent"
        />
      )}
      {providers?.buy && (
        <ProviderSection 
          title="Buy" 
          providers={providers.buy} 
          action="Buy"
        />
      )}
    </div>
  );
}
