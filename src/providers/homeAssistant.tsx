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
  HassUser,
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

  const connectedCallback = useCallback(
    (user: HassUser): void => {
      console.log("Connected to Home Assistant:", user);
      setHomeAssistant((prevHomeAssistant: HomeAssistantContextType) => ({
        ...prevHomeAssistant,
        client,
      }));

      // Cleanup search params
      router.replace(pathname);
    },
    [pathname, router, setHomeAssistant],
  );

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

  useEffect(() => {
    if (!settings) return;
    console.log("Setup Home Assistant..");

    if (!settings.homeAssistant?.url) {
      console.warn("No url found");
      if (pathname !== "/setup") router.push("/setup");
      return;
    }

    if (!settings.homeAssistant?.accessToken) {
      console.warn("No access token found");
      if (pathname !== "/setup") router.push("/setup");
      return;
    }

    client = new HomeAssistant(
      connectedCallback,
      configCallback,
      entitiesCallback,
      servicesCallback,
      settings.homeAssistant,
    );

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
