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
  entities: Array<MediaSetting>;
}

export interface LightSettings {
  entities: Array<LightSetting>;
}

export interface SwitchSettings {
  entities: Array<SwitchSetting>;
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

export interface MediaSetting extends EntitySetting {}

export interface LightSetting extends EntitySetting {}

export interface SwitchSetting extends EntitySetting {}
