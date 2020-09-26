export type BridgeApi<T> = {
  [K in keyof T]: (...args: any[]) => any;
};

export type BridgeClientApi<T extends BridgeApi<T>> = {
  [K in keyof T]: (
    ...args: any[]
  ) => ReturnType<T[K]> extends Promise<any>
    ? ReturnType<T[K]>
    : Promise<ReturnType<T[K]>>;
};
