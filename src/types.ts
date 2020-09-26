export type BridgeApi = Record<string, (...args: any[]) => any>;

export type BridgeClientApi<T extends BridgeApi> = {
  [K in keyof T]: (
    ...args: Parameters<T[K]>
  ) => ReturnType<T[K]> extends Promise<any>
    ? ReturnType<T[K]>
    : Promise<ReturnType<T[K]>>;
};

export type BridgeNamespaces = Record<string, BridgeApi>;

export type BridgeClientNamespaces<T extends BridgeNamespaces> = {
  [K in keyof T]: BridgeClientApi<T[K]>;
};
