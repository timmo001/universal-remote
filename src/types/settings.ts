export interface Settings {
  homeAssistant: HomeAssistantConfig;
  [key: string]: any;
}

export interface HomeAssistantConfig {
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  expires?: number;
  expiresIn?: number;
  url?: string;
}
