import { ipcRenderer } from "electron";

const BridgeClient = <T>(): T => {
  return makeProxy((namespace) => {
    return makeProxy((prop) => {
      return (...args: any[]) =>
        ipcRenderer.invoke(`${namespace}:${prop}`, ...args);
    });
  });

  // return new Proxy(
  //   {},
  //   {
  //     get: (_: never, prop: string) => {
  //       return (...args: any[]) =>
  //         ipcRenderer.invoke(`bridge:${prop}`, ...args);
  //     },
  //   }
  // ) as T;
};

process.once("loaded", () => {
  (window as any).__bridge__ = BridgeClient();
});

function makeProxy(fn: (prop: string) => any) {
  return new Proxy(
    {},
    {
      get: (_: never, prop: string) => {
        return fn(prop);
      },
    }
  ) as any;
}
