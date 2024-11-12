import express from "express";
import { StatusCodes } from "http-status-codes";
import { expressYupMiddleware } from "express-yup-middleware";

import userService from "./user.service";
import { addUser, updateUser } from "./users.schemas";
import userController from "../controller/user.controller";

const router = express.Router();

const STATUS = {
  success: "OK",
  failure: "NO",
};

//Get all users
router.get("/all", userController.getAllUsers);

//Get user by id

router.get("/get/:id", userController.getUser);

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
  expressYupMiddleware({ schemaValidator: updateUser }),
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

export default router;
