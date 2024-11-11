import express from "express";
import appRoutes from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/v1", appRoutes);

app.listen(port, () => {
  console.log(`Hey, go to localhost: ${port}`);
});
