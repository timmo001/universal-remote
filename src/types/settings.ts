export interface Settings {
  homeAssistant: HomeAssistantConfig;
  tv: TvSettings;
  music: MusicSettings;
  lights: LightSettings;
  switches: SwitchSettings;
}

export interface HomeAssistantConfig {
  accessToken?: string;
  url?: string;
}

export interface TvSettings {
  entities: Array<TVSetting>;
}

export interface MusicSettings {
  entities: Array<EntitySetting>;
}

export interface LightSettings {
  entities: Array<EntitySetting>;
}

export interface SwitchSettings {
  entities: Array<EntitySetting>;
}

export interface EntitySetting {
  entity: string;
}

export interface TVSetting extends EntitySetting {
  macAddress?: string;
}
