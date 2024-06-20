import { createContext } from "@lit/context";

export const fullscreenContext = createContext<boolean>(Symbol("fullscreen-context"));
