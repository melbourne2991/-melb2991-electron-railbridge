import { BridgeClientApi } from "./types";

export const BridgeClient = <T extends BridgeClientApi<T>>() =>
  (window as any).__bridge__ as T;
