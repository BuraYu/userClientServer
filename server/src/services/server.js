import express from "express";
import userRoutes from "./users.routes";
import mainRoutes from "./main.routes";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use("/v1", mainRoutes);
app.use("/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Hey, go to localhost: ${port}`);
});
