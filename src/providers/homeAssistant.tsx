"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  HassConfig,
  HassEntities,
  HassServices,
} from "home-assistant-js-websocket";
import { usePathname, useRouter } from "next/navigation";

import { HomeAssistant } from "@/utils/homeAssistant";
import { useSettings } from "@/providers/settings";
import { HomeAssistantConfig } from "@/types/settings";

type HomeAssistantContextType = {
  client: HomeAssistant | null;
  config: HassConfig | null;
  entities: HassEntities | null;
  services: HassServices | null;
};

const defaultHomeAssistantContext: HomeAssistantContextType = {
  client: null,
  config: null,
  entities: null,
  services: null,
};

const HomeAssistantContext = createContext<HomeAssistantContextType>(
  defaultHomeAssistantContext,
);

let client: HomeAssistant | null = null;
export function HomeAssistantProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSettings();

  const [homeAssistant, setHomeAssistant] = useState<HomeAssistantContextType>(
    defaultHomeAssistantContext,
  );

  const connectedCallback = useCallback((): void => {
    console.log("Connected to Home Assistant");
    setHomeAssistant((prevHomeAssistant: HomeAssistantContextType) => ({
      ...prevHomeAssistant,
      client,
    }));

    // Cleanup search params
    router.replace(pathname);
  }, [pathname, router, setHomeAssistant]);

  const configCallback = useCallback(
    (config: HassConfig): void => {
      setHomeAssistant((prevHomeAssistant: HomeAssistantContextType) => ({
        ...prevHomeAssistant,
        config,
      }));
    },
    [setHomeAssistant],
  );

  const entitiesCallback = useCallback(
    (entities: HassEntities): void => {
      setHomeAssistant((prevHomeAssistant: HomeAssistantContextType) => ({
        ...prevHomeAssistant,
        entities,
      }));
    },
    [setHomeAssistant],
  );

  const servicesCallback = useCallback(
    (services: HassServices): void => {
      setHomeAssistant((prevHomeAssistant: HomeAssistantContextType) => ({
        ...prevHomeAssistant,
        services,
      }));
    },
    [setHomeAssistant],
  );

  const saveConfigCallback = useCallback(
    (config: HomeAssistantConfig): void => {
      if (!localStorage) return;

      localStorage.setItem(
        "settings",
        JSON.stringify({
          ...settings,
          homeAssistant: config,
        }),
      );
    },
    [settings],
  );

  useEffect(() => {
    console.log("Connecting to Home Assistant..");

    client = new HomeAssistant(
      connectedCallback,
      configCallback,
      entitiesCallback,
      servicesCallback,
      saveConfigCallback,
    );

    // Get home assistant config
    if (settings) client.config = settings.homeAssistant;

    if (!client.config) {
      console.warn("No config found");
      return;
    }

    if (!client.config.url) {
      console.warn("No url found");
      if (pathname !== "/setup") router.push("/setup");
      return;
    }

    (async () => {
      try {
        await client.connect();
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      if (client) client.disconnect();
      setHomeAssistant(defaultHomeAssistantContext);
    };
  }, [
    configCallback,
    connectedCallback,
    entitiesCallback,
    pathname,
    router,
    saveConfigCallback,
    servicesCallback,
    settings,
  ]);

  return (
    <HomeAssistantContext.Provider value={homeAssistant}>
      {children}
    </HomeAssistantContext.Provider>
  );
}

export function useHomeAssistant(): HomeAssistantContextType {
  return useContext<HomeAssistantContextType>(HomeAssistantContext);
}
