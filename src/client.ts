import { BridgeClientNamespaces, BridgeNamespaces } from "./types";

export const BridgeClient = <T extends BridgeNamespaces>() =>
  (window as any).__bridge__ as BridgeClientNamespaces<T>;
