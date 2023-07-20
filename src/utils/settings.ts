import { Settings } from "@/types/settings";

export const defaultSettings: Settings = { homeAssistant: {} };

export function getSettings(): Settings {
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
