"use client";
import {
  Auth,
  AuthData,
  callService,
  Connection,
  createConnection,
  createLongLivedTokenAuth,
  ERR_HASS_HOST_REQUIRED,
  ERR_INVALID_AUTH,
  getAuth,
  getUser,
  HassConfig,
  HassEntities,
  HassEntity,
  HassServices,
  HassUser,
  subscribeConfig,
  subscribeEntities,
  subscribeServices,
} from "home-assistant-js-websocket";

import type { HomeAssistantConfig } from "@/types/settings";

export const UNAVAILABLE = "unavailable";
export const UNKNOWN = "unknown";
export const ON = "on";
export const OFF = "off";

export const UNAVAILABLE_STATES = new Set([UNAVAILABLE, UNKNOWN]);
export const OFF_STATES = new Set([UNAVAILABLE, UNKNOWN, OFF]);

export function getToggleServiceFromDomain(
  domain: string,
  turnOn: boolean = true,
) {
  switch (domain) {
    case "lock":
      return turnOn ? "unlock" : "lock";
    case "cover":
      return turnOn ? "open_cover" : "close_cover";
    case "button":
    case "input_button":
      return "press";
    case "scene":
      return "turn_on";
    default:
      return turnOn ? "turn_on" : "turn_off";
  }
}

export function entitySupportsFeature(
  entity: HassEntity,
  feature: number,
): boolean {
  return (entity.attributes?.supported_features! & feature) !== 0;
}

async function loadTokens(
  config: HomeAssistantConfig,
): Promise<AuthData | null> {
  console.log("Load Home Assistant tokens:", config);

  if (
    !config.accessToken ||
    !config.refreshToken ||
    !config.clientId ||
    !config.expires ||
    !config.expiresIn ||
    !config.url
  )
    return null;

  return {
    access_token: config.accessToken,
    refresh_token: config.refreshToken,
    clientId: config.clientId,
    expires: Number(config.expires),
    expires_in: config.expiresIn,
    hassUrl: config.url,
  };
}

export class HomeAssistant {
  public config: HomeAssistantConfig | null = null;
  public connection: Connection | null = null;
  public haConfig: HassConfig | null = null;
  public haEntities: HassEntities | null = null;
  public haServices: HassServices | null = null;
  public haUser: HassUser | null = null;

  private auth: Auth | null = null;
  private connectedCallback: () => void;
  private configCallback: (config: HassConfig) => void;
  private entitiesCallback: (entities: HassEntities) => void;
  private servicesCallback: (services: HassServices) => void;
  private saveConfigCallback: (config: HomeAssistantConfig) => void;

  constructor(
    connectedCallback: () => void,
    configCallback: (config: HassConfig) => void,
    entitiesCallback: (entities: HassEntities) => void,
    servicesCallback: (services: HassServices) => void,
    saveConfigCallback: (config: HomeAssistantConfig) => void,
    connection?: Connection,
    config?: HomeAssistantConfig,
  ) {
    this.connectedCallback = connectedCallback;
    this.configCallback = configCallback;
    this.entitiesCallback = entitiesCallback;
    this.servicesCallback = servicesCallback;
    this.saveConfigCallback = saveConfigCallback;
    this.connection = connection || null;
    this.config = config || null;
  }

  public baseUrl(): string | null {
    return this.config?.url || null;
  }

  public connected: boolean = this.connection !== null;

  async callService(
    domain: string,
    service: string,
    serviceData: Record<string, unknown>,
  ): Promise<unknown> {
    if (!this.connection) return;
    console.log("Call Home Assistant service:", {
      domain,
      service,
      serviceData,
    });
    return await callService(this.connection, domain, service, serviceData);
  }

  disconnect(): void {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }

  async connect(): Promise<void> {
    if (this.connection) return;

    console.log("Connecting to Home Assistant:", this.config);

    if (!this.config?.url) throw new Error("Missing Home Assistant URL");
    if (!this.config?.accessToken)
      throw new Error("Missing Home Assistant access token");

    // Create auth object
    console.log("Home Assistant: createLongLivedTokenAuth");
    this.auth = createLongLivedTokenAuth(
      this.config.url,
      this.config.accessToken,
    );

    // Connect to Home Assistant
    console.log("Home Assistant: createConnection");
    this.connection = await createConnection({ auth: this.auth });

    this.connection.addEventListener("ready", () => {
      console.log("Home Assistant connection ready");
    });

    this.connection.addEventListener("disconnected", () => {
      console.log("Disconnected from Home Assistant");
      if (this.connection) this.connection.reconnect();
    });

    subscribeConfig(this.connection, (config: HassConfig) => {
      console.log("Home Assistant config updated");
      this.haConfig = config;
      this.configCallback(config);
    });

    subscribeEntities(this.connection, (entities: HassEntities) => {
      this.haEntities = entities;
      this.entitiesCallback(entities);
    });

    subscribeServices(this.connection, (services) => {
      this.haServices = services;
      this.servicesCallback(services);
    });

    getUser(this.connection).then((user: HassUser) => {
      console.log("Logged into Home Assistant as", user.name);
      this.haUser = user;
      this.connectedCallback();
    });
  }

  entityCanTurnOnOff(entity: HassEntity | undefined): boolean {
    if (!entity) return false;
    const domain = entity.entity_id.split(".")[0];
    const service = getToggleServiceFromDomain(domain);
    if (this.haServices?.[domain]?.[service]) return true;
    return false;
  }

  async entityTurnOnOff(entity: HassEntity, turnOn = true): Promise<unknown> {
    if (!this.connection) return;
    const domain = entity.entity_id.split(".")[0];

    return await this.callService(
      domain === "group" ? "homeassistant" : domain,
      getToggleServiceFromDomain(domain, turnOn),
      {
        entity_id: entity.entity_id,
      },
    );
  }

  async saveTokens(data: AuthData | null): Promise<void> {
    console.log("Home Assistant: saveTokens:", data);

    this.saveConfigCallback({
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
      clientId: data?.clientId || undefined,
      expires: data?.expires,
      expiresIn: data?.expires_in,
      url: data?.hassUrl,
    });
  }
}
