import { ipcMain } from "electron";

export const BridgeServer = <
  T extends Record<string, Record<string, (...args: any[]) => any>>
>(
  namespaces: T
): void => {
  Object.keys(namespaces).forEach((namespaceKey) => {
    const instance = (namespaces as any)[namespaceKey];

    Object.keys(instance).forEach((key) => {
      const handler = (instance as any)[key];

      ipcMain.handle(`${namespaceKey}:${key}`, (_, ...args: any[]) => {
        return handler(...args);
      });
    });
  });
};
