"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Settings } from "@/types/settings";

export const defaultSettings: Settings = {
  homeAssistant: {},
  tv: { entities: [] },
  music: { entities: [] },
  lights: { entities: [] },
};

function getSettings(): Settings {
  try {
    if (!localStorage) return defaultSettings;
    const settings = localStorage.getItem("settings");
    if (!settings) return defaultSettings;
    return JSON.parse(settings) as Settings;
  } catch (e) {
    console.error(e);
    return defaultSettings;
  }
}

interface SettingsContextType {
  settings?: Settings;
  updateSettings: (newSettings: Settings) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  updateSettings: () => {},
});

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [settings, setSettings] = useState<Settings>();

  useEffect(() => {
    if (!settings) {
      const newSettings = getSettings();
      console.log("Loaded settings:", newSettings);
      setSettings(newSettings);
    }
  }, [settings]);

  function handleUpdate(newSettings: Settings): void {
    console.log("Current settings:", settings);
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
    console.log("Saved settings:", newSettings);
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings: handleUpdate }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  return useContext<SettingsContextType>(SettingsContext);
}
