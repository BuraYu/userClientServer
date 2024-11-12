import userDao from "../models/persistence/user.dao";

const getUser = (userId) => {
  return userDao.get(userId);
};

const getAllUsers = () => {
  return userDao.getAll();
};

const addUser = (details) => {
  return userDao.insert(details);
};

const removeUser = (userId) => {
  userDao.remove(userId);
};

const updateUser = (userId, details) => {
  return userDao.update(userId, details);
};

export default { getUser, addUser, removeUser, updateUser, getAllUsers };
