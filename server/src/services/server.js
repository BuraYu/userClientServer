import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import pino from "pino";

import userRoutes from "./users.routes";
import mainRoutes from "./main.routes";

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  // standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // // store: ... , // Redis, Memcached, etc. See below.
});

app.use(compression());

app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/v1", mainRoutes);
app.use("/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Hey, go to localhost: ${port}`);
});
