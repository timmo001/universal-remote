export interface Settings {
  homeAssistant: HomeAssistantConfig;
  tv: TvSettings;
  media: MediaSettings;
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

export interface MediaSettings {
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

export enum TVType {
  LGWebOS = "LGWebOS",
  LGHorizon = "LGHorizon",
}

export interface TVSetting extends EntitySetting {
  type: TVType;
  macAddress?: string;
}
