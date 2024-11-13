import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import { StatusCodes } from "http-status-codes";

import {
  addUser,
  updateUser,
  getUser,
  deleteUser,
} from "./users.schemas";
import userController from "../controller/user.controller";

const router = express.Router();

//Get all users
router.get("/all", userController.getAllUsers);

//Get user by id

router.get(
  "/get/:id",
  expressYupMiddleware({ schemaValidator: getUser }),
  userController.getUser
);

//add a user

router.post(
  "/",
  expressYupMiddleware({
    schemaValidator: addUser,
    expectedStatusCode: StatusCodes.BAD_REQUEST,
  }),
  userController.addUser
);

router.put(
  "/:id",
  expressYupMiddleware({
    schemaValidator: updateUser,
    expectedStatusCode: StatusCodes.BAD_REQUEST,
  }),
  userController.updateUser
);

router.delete(
  "/:id",
  expressYupMiddleware({ schemaValidator: deleteUser }),
  userController.deleteUser
);

export default router;
