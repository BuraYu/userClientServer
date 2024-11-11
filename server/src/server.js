import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();
const port = 3000;

app.use(express.json());

const STATUS = {
  SUCCESS: "OK",
  FAILURE: "NO",
};

app.get("/", (req, res) => {
  res.status(StatusCodes.NOT_FOUND);
  res.send("Hello You");
});

app.post("/add", (req, res) => {
  const data = [];
  const { body } = req;
  if (!body.name) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: STATUS.FAILURE,
      message: "Name is required",
    });
  }
  data.push(req.body);
  return res.status(StatusCodes.CREATED).send({
    status: STATUS.SUCCESS,
    message: data,
  });
});

app.listen(port, () => {
  console.log(`Hey, go to localhost: ${port}`);
});
