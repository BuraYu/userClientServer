import userService from "../services/user.service";
import { StatusCodes } from "http-status-codes";

const STATUS = {
  success: "OK",
  failure: "NO",
};

const updateUser = (req, res) => {
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
};

const addUser = (req, res) => {
  const { body: user } = req;
  const addedUser = userService.addUser(user);
  return res.status(StatusCodes.CREATED).send({
    status: STATUS.success,
    user: addedUser,
  });
};

const deleteUser = (req, res) => {
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
};

const getUser = (req, res) => {
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
};

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();

  if (users) {
    return res.status(StatusCodes.OK).send(users);
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: "No users found",
  });
};

export default {
  updateUser,
  addUser,
  deleteUser,
  getUser,
  getAllUsers,
};
