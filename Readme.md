# Readme

## Usage

- Install:

`yarn install @melb2991/electron-railbridge`

preload.ts

```ts
import "@melb2991/electron-railbridge/preload";
```

api.ts

```ts
export const api = {
  hello: (name: string) => `Hello ${name}`,
  goodbye: async (name: string) => `Goodbye ${name}`,
};

export type Api = typeof api;
```

main.ts

```ts
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { api } from "./api";
import { BridgeServer } from "@melb2991/electron-railbridge/server";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
  BridgeServer(api);

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ... other stuff
```

renderer/index.ts

```ts
import { BridgeClient } from "@melb2991/electron-railbridge/client";
import { Api } from "../api";

const bridgeClient = BridgeClient<Api>();

async function callClient() {
  console.log(await bridgeClient.hello("Jim")); // Hello Jim
  console.log(await bridgeClient.goodbye("Bob")); // Goodbye Bob
}

callClient();
```
