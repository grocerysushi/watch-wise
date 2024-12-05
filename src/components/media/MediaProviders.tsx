import { WatchProviders } from "./providers/types";
import { PriceInfo } from "@/lib/types/media";
import { ProviderSection } from "./providers/ProviderSection";
import { PricingSection } from "./providers/PricingSection";

interface MediaProvidersProps {
  providers: WatchProviders;
  pricing?: PriceInfo[];
}

export function MediaProviders({ providers, pricing }: MediaProvidersProps) {
  if (!providers && !pricing) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Where to Watch</h2>
      
      {pricing && <PricingSection pricing={pricing} />}

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