import express from "express";
import { StatusCodes } from "http-status-codes";

import userService from "./services/user.service";
import users from "./models/data/users.data";

const router = express.Router();

const STATUS = {
  success: "OK",
  failure: "NO",
};

router.get("/ping", (req, res) => {
  res.status(StatusCodes.OK);
  res.send("OK");
});

//Get all users
router.get("/all", (req, res) => {
  const users = userService.getAllUsers();

  if (user) {
    return res.status(StatusCodes.OK).send(users);
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: "No users found",
  });
});

//Get user by id

router.get("/get/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = userService.getUser(id);
  console.log("this", req.params.id);
  if (user) {
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      message: user,
    });
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: "No users found",
  });
});

//add a user

router.post("/add", (req, res) => {
  const { body: user } = req;

  const addedUser = userService.addUser(user);

  return res.status(StatusCodes.BAD_REQUEST).send({
    status: STATUS.success,
    message: addedUser,
  });
});

//Update a user

router.put("/update/:id", (req, res) => {
  const { body: user } = req;

  const id = parseInt(req.params.id, 10);

  const updatedUser = userService.updateUser(id, user);

  if (updatedUser) {
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      message: updatedUser,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} is not found.`,
    });
  }
});

export default router;
