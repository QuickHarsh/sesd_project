import { SpendSmartApplication } from "./app/SpendSmartApplication.js";
import { AppConfig } from "./config/AppConfig.js";
import { connectDatabase } from "./config/database.js";

async function bootstrap() {
  await connectDatabase(AppConfig.MONGODB_URI);

  const app = new SpendSmartApplication().getExpressApp();

  const server = app.listen(AppConfig.PORT, () => {
    console.log(`SpendSmart backend running on port ${AppConfig.PORT}`);
  });

  const shutdown = (signal) => {
    console.log(`Received ${signal}. Closing HTTP server...`);
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap().catch((error) => {
  console.error("Failed to start backend:", error.message);
  process.exit(1);
});
