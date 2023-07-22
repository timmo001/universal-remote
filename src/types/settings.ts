export interface Settings {
  homeAssistant: HomeAssistantConfig;
  tv: TvSettings;
  music: MusicSettings;
  lights: LightSettings;
}

export interface HomeAssistantConfig {
  accessToken?: string;
  url?: string;
}

export interface TvSettings {
  entities: Array<string>;
}

export interface MusicSettings {
  entities: Array<string>;
}

export interface LightSettings {
  entities: Array<string>;
}
