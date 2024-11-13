import userService from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import logger, { pino } from "pino";

const STATUS = {
  success: "OK",
  failure: "NO",
};

/**
 * Updates a user by their ID.
 * @function updateUser
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing the user data to update.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} res - The response object.
 * @returns {Object} The response with a success or failure status.
 * @returns {Object} res.status - The HTTP status code.
 * @returns {Object} res.send - The response message containing the status and updated user data, or an error message if the user is not found.
 */

const updateUser = (req, res) => {
  const { body: user } = req;

  const id = parseInt(req.params.id, 10);

  const updatedUser = userService.updateUser(id, user);

  logger.info(`Attempting to update user with ID: ${id}`);

  if (updatedUser) {
    logger.info(`User with ID ${id} succesfully updated`);
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      user: updatedUser,
    });
  } else {
    logger.info(`User with ID ${id} not found`);

    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} is not found.`,
    });
  }
};

/**
 * Adds a user.
 * @function addUser
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing the user data to update.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} res - The response object.
 * @returns {Object} The response with a success.
 * @returns {Object} res.status - The HTTP status code.
 * @returns {Object} res.send - The response message containing the status and updated user data, or an error message if the user is not found.
 */

const addUser = (req, res) => {
  const { body: user } = req;
  const addedUser = userService.addUser(user);
  logger.info(`Attempting to add user ${JSON.stringify(user)}`);
  return res.status(StatusCodes.CREATED).send({
    status: STATUS.success,
    user: addedUser,
  });
};

/**
 * Deletes a user by their ID.
 * @function deleteUser
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing the user data to update.
 * @param {Object} req.body.user - Deconstructed User data (if needed for deletion)
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} res - The response object.
 * @returns {Object} The response with a success or failure status.
 * @returns {Object} res.status - The HTTP status code.
 * @returns {Object} res.send - The response message containing the status and updated user data, or an error message if the user is not found.
 */

const deleteUser = (req, res) => {
  const { body: user } = req;
  console.log(user);
  const id = parseInt(req.params.id, 10);

  const status = userService.removeUser(id, user);
  logger.info(`Attempting to delete user with ID: ${id}`);

  if (status) {
    logger.info(`User with ID ${id} succesfully deleted`);

    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      message: `User with ID ${id} has been successfully deleted.`,
    });
  } else {
    logger.info(`User with ID ${id} not found`);

    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} is not found.`,
    });
  }
};

/**
 * Gets a user by their ID.
 * @function getUser
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing the user data to update.
 * @param {Object} req.body.user - Deconstructed User data (if needed for deletion)
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} res - The response object.
 * @returns {Object} The response with a success or failure status.
 * @returns {Object} res.status - The HTTP status code.
 * @returns {Object} res.send - The response message containing the status and updated user data, or an error message if the user is not found.
 */

const getUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = userService.getUser(id);

  logger.info(`Attempting to get user with id: ${id}`);

  if (user) {
    logger.info(`User with ${id} found`);
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      user,
    });
  }
  logger.info(`User with ${id} not found`);

  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: "User ${id} is not found.",
  });
};

/**
 * Gets all the users.
 * @function getAllUsers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response with a success or failure status.
 * @returns {Object} res.status - The HTTP status code.
 * @returns {Object} res.send - The response message containing the status and updated user data, or an error message if the user is not found.
 */

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  logger.info("Attempting to get all users");
  if (users) {
    logger.info("Returning all users");
    return res.status(StatusCodes.OK).send(users);
  }
  logger.info("No users found");
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
