import { SpendSmartApplication } from "./app/SpendSmartApplication.js";
import { AppConfig } from "./config/AppConfig.js";
import { connectDatabase } from "./config/database.js";

async function bootstrap() {
  await connectDatabase(AppConfig.MONGODB_URI);

  const app = new SpendSmartApplication().getExpressApp();

  app.listen(AppConfig.PORT, () => {
    console.log(`SpendSmart backend running on port ${AppConfig.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start backend:", error.message);
  process.exit(1);
});
