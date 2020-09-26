import { ipcRenderer } from "electron";

const BridgeClient = <T>(): T => {
  return new Proxy(
    {},
    {
      get: (_: never, prop: string) => {
        return (...args: any[]) =>
          ipcRenderer.invoke(`bridge:${prop}`, ...args);
      },
    }
  ) as T;
};

process.once("loaded", () => {
  (window as any).__bridge__ = BridgeClient();
});
