import store from "./store";
import { DARK_MODE, LIGHT_MODE } from "../assets/styles";

const defaultSettings = {
  toggleFIRs: true,
  isDarkMode: false,
  themeColors: LIGHT_MODE,
  airportMarkerVisibility: {
      enabled: true,
      showControllerBadges: true,
      showApproachCircle: true
  }
}

export const loadSettings = () => {
  try {
    const serializedState = localStorage.getItem('settings');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
    return defaultSettings;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const saveSettings = (settingsState) => {
  try {
    const serializedState = JSON.stringify(settingsState);
    localStorage.setItem('settings', serializedState);
  } catch (err) {
    console.log(err);
  }
}

export const initalize = () => {
  store.subscribe(() => {
    saveSettings(store.getState().settings)
  })
}
