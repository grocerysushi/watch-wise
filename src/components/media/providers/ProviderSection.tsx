import { handleProviderClick } from "./providerUtils";

interface Provider {
  provider_name: string;
  logo_path: string;
}

interface ProviderSectionProps {
  title: string;
  providers: Provider[];
  action: string;
}

export function ProviderSection({ title, providers, action }: ProviderSectionProps) {
  return (
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
}