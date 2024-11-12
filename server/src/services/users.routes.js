import express from "express";
import { StatusCodes } from "http-status-codes";
import { expressYupMiddleware } from "express-yup-middleware";

import userService from "./user.service";
import { addUser, updateUser } from "./users.schemas";

const router = express.Router();

const STATUS = {
  success: "OK",
  failure: "NO",
};

//Get all users
router.get("/all", (req, res) => {
  const users = userService.getAllUsers();

  if (users) {
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
      user,
    });
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: "User ${id} is not found.",
  });
});

//add a user

router.post(
  "/",
  expressYupMiddleware({
    schemaValidator: addUser,
    expectedStatusCode: StatusCodes.BAD_REQUEST,
  }),
  (req, res) => {
    const { body: user } = req;
    const addedUser = userService.addUser(user);
    return res.status(StatusCodes.CREATED).send({
      status: STATUS.success,
      user: addedUser,
    });
  }
);

//Update a user

router.put(
  "/:id",
  expressYupMiddleware({
    schemaValidator: updateUser,
    expectedStatusCode: StatusCodes.BAD_REQUEST,
  }),
  (req, res) => {
    const { body: user } = req;

    const id = parseInt(req.params.id, 10);

    const updatedUser = userService.updateUser(id, user);

    if (updatedUser) {
      return res.status(StatusCodes.OK).send({
        status: STATUS.success,
        user: updatedUser,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: `User ${id} is not found.`,
      });
    }
  }
);

//remove a user

router.delete("/:id", (req, res) => {
  const { body: user } = req;
  console.log(user);
  const id = parseInt(req.params.id, 10);

  const status = userService.removeUser(id, user);

  if (status) {
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      message: `User with ID ${id} has been successfully deleted.`,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} is not found.`,
    });
  }
});

export default router;
