import { createContext } from "@lit/context";
import { VirtualMachine } from "../lib/vm";

export const virtualMachineContext = createContext<VirtualMachine>(
  "virtual-machine-context",
);
