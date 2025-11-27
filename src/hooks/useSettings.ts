import { useLocalStorage } from "./useLocalStorage";

export interface Settings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  animationsEnabled: true,
};

export function useSettings() {
  return useLocalStorage<Settings>("app-settings", DEFAULT_SETTINGS);
}
