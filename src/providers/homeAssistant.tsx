"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Connection,
  HassConfig,
  HassEntities,
  HassServices,
  HassUser,
} from "home-assistant-js-websocket";
import { usePathname, useRouter } from "next/navigation";

import { HomeAssistant } from "@/utils/homeAssistant";
import { useSettings } from "@/providers/settings";

type HomeAssistantContextType = {
  client: HomeAssistant | null;
  config: HassConfig | null;
  connection: Connection | null;
  entities: HassEntities | null;
  services: HassServices | null;
  user: HassUser | null;
};

const defaultHomeAssistantContext: HomeAssistantContextType = {
  client: null,
  config: null,
  connection: null,
  entities: null,
  services: null,
  user: null,
};

const HomeAssistantContext = createContext<HomeAssistantContextType>(
  defaultHomeAssistantContext,
);

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
    (connection: Connection, user: HassUser): void => {
      console.log("Connected to Home Assistant:", user);
      setHomeAssistant((prevHomeAssistant: HomeAssistantContextType) => ({
        ...prevHomeAssistant,
        connection,
        user,
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
    if (!settings?.homeAssistant) return;

    if (!settings.homeAssistant?.url) {
      console.warn("Home Assistant: No url found");
      if (pathname !== "/setup") router.push("/setup");
      return;
    }

    if (!settings.homeAssistant?.accessToken) {
      console.warn("Home Assistant: No access token found");
      if (pathname !== "/setup") router.push("/setup");
      return;
    }

    const client =
      homeAssistant.client ||
      new HomeAssistant(
        connectedCallback,
        configCallback,
        entitiesCallback,
        servicesCallback,
        settings.homeAssistant,
      );

    if (!client.connected) {
      client
        .connect()
        .then(() => {
          // if (!homeAssistant.client) {
          setHomeAssistant((prevHomeAssistant: HomeAssistantContextType) => ({
            ...prevHomeAssistant,
            client,
          }));
          // }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [
    configCallback,
    connectedCallback,
    entitiesCallback,
    homeAssistant.client,
    pathname,
    router,
    servicesCallback,
    settings?.homeAssistant,
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
