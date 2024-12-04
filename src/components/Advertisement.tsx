import React, { useEffect } from 'react';

interface AdvertisementProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  style?: React.CSSProperties;
}

export function Advertisement({ slot, format = 'auto', style }: AdvertisementProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <div className="w-full my-4 text-center">
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client="YOUR-ADSENSE-CLIENT-ID" // Replace with your AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}