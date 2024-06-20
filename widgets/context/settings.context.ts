import { createContext } from "@lit/context";
import type { Settings } from "../types";

export const settingsContext = createContext<Settings>(Symbol("settings-context"));
