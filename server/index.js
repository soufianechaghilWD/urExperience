import App from "./src/app.js";
import userRouter from "./src/routes/user.route.js";

const port = process.env.PORT || 3000;
const dbUrl = process.env.dbUrl;

const app = new App(port, dbUrl, [new userRouter()]);
app.listen();