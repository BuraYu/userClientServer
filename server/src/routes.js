import express from "express";
import { StatusCodes } from "http-status-codes";
import { appRoutes } from "./routes";

const router = express.Router();

const STATUS = {
  status: "OK",
  failure: "NO",
};

router.get("/", (req, res) => {
  res.status(StatusCodes.NOT_FOUND);
  res.send("Hello You");
});

router.post("/add", (req, res) => {
  const data = [];
  const { body } = req;
  if (!body.name) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: STATUS.failure,
      message: "Name is required",
    });
  }
  data.push(req.body);
  return res.status(StatusCodes.CREATED).send({
    status: STATUS.status,
    message: data,
  });
});

export default router;
