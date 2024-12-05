export interface Provider {
  provider_name: string;
  logo_path: string;
}

export interface WatchProviders {
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}