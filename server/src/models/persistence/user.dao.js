import users from "../data/users.data";

/**
 * Get the user by their ID.
 * @function get
 * @param {Object} userId - Pass the userID.
 * @returns {Object} Returns user with the userID.
 */

const get = (userId) => {
  const findUser = users.find((user) => {
    if (user.id === userId) {
      return user;
    }
    return null;
  });
  console.log(findUser);
  return findUser;
};

/**
 * Get all users.
 * @function getAll
 * @returns {Object} Returns all users.
 */

const getAll = () => {
  return users;
};

/**
 * Adds user 
 * @function insert
 * @param {Object} details - Pass the details object with data to be added.
 * @returns {Object} Returns added user.
 */

const insert = (details) => {
  const newUser = { id: users.length + 1, ...details };
  users.push(newUser);

  return newUser;
};


/**
 * Removes user 
 * @function remove
 * @param {Object} userId - Pass the userId of user to be deleted.
 * @returns {Object} Returns deleted user.
 */

const remove = (userId) => {
  const index = users.findIndex((user) => user && user.id === userId);

  if (index !== -1) {
    const deletedUser = users[index];
    users.splice(index, 1);
    return deletedUser;
  }
  return false;
};

/**
 * Updates user data
 * @function update
 * @param {Object} userId - Pass the userId of user to be updated.
 * @param {Object} newDetails - Pass the new data of user to be updated.
 * @returns {Object} Returns updated user.
 */

const update = (userId, newDetails) => {
  let existingUser = null;
  let userIndex;

  users.forEach((user, index) => {
    if (user.id === userId) {
      existingUser = user;
      userIndex = index;
    }
  });

  if (!existingUser) {
    return false;
  }

  const updatedUser = {
    ...existingUser,
    ...newDetails,
  };
  users[userIndex] = updatedUser;

  return updatedUser;
};

export default { get, getAll, insert, remove, update };
