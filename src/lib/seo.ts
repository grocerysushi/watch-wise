import { supabase } from "@/integrations/supabase/client";
import { MediaDetails } from "./types/media";

export async function updateSitemapEntry(media: MediaDetails) {
  const { error } = await supabase
    .from('sitemap_entries')
    .upsert({
      url: `/${media.media_type}/${media.id}`,
      media_type: media.media_type,
      media_id: media.id,
      last_modified: new Date().toISOString(),
      priority: 0.8,
      change_freq: 'weekly'
    }, {
      onConflict: 'media_type,media_id'
    });

  if (error) {
    console.error('Error updating sitemap:', error);
  }
}

export const searchStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.cueious.net/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.cueious.net/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};