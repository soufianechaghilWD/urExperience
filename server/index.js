import App from "./src/app.js";
import companyRouter from "./src/routes/company.route.js";
import experienceRouter from "./src/routes/experience.route.js";
import picRouter from "./src/routes/picture.route.js";
import userRouter from "./src/routes/user.route.js";

const port = process.env.PORT || 4000;
const dbUrl = process.env.dbUrl;

const app = new App(port, dbUrl, [
  new userRouter(),
  new picRouter(),
  new companyRouter(),
  new experienceRouter(),
]);
app.listen();
