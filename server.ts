import { App } from "./src/App";
import { sequelize } from "./src/config/db";
import Link from "./src/Models/Link";

new App().server.listen(3000, async () => {
  await sequelize.sync();
  console.log("Server running...");
});
