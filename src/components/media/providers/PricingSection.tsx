import { PriceInfo } from "@/lib/types/media";

interface PricingSectionProps {
  pricing: PriceInfo[];
}

export function PricingSection({ pricing }: PricingSectionProps) {
  if (!pricing?.length) return null;

  return (
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
  );
}