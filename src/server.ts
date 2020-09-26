import { BridgeApi } from "./types";
import { ipcMain } from "electron";

export const BridgeServer = <T extends BridgeApi<T>>(instance: T): void => {
  Object.keys(instance).forEach((key) => {
    const handler = (instance as any)[key];

    ipcMain.handle(`bridge:${key}`, (_, ...args: any[]) => {
      return handler(...args);
    });
  });
};
