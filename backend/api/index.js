import { SpendSmartApplication } from "../src/app/SpendSmartApplication.js";
import { AppConfig } from "../src/config/AppConfig.js";
import { connectDatabase } from "../src/config/database.js";

let app;
let initPromise;

async function getApp() {
  if (app) {
    return app;
  }

  if (!initPromise) {
    initPromise = (async () => {
      await connectDatabase(AppConfig.MONGODB_URI);
      app = new SpendSmartApplication().getExpressApp();
      return app;
    })();
  }

  return initPromise;
}

export default async function handler(req, res) {
  const expressApp = await getApp();
  return expressApp(req, res);
}
