import users from "../data/users.data";

const get = (userId) => {
  const findUser = users.find((user) => {
    if (user.id === userId) {
      return user;
    }
    return null;
  });

  return findUser;
};

const getAll = () => {
  return users;
};

const insert = (details) => {
  const newUser = { ...details, id: users.length + 1 };
  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  const deleteUser = (user, index) => {
    if (user.id === userId) {
      user.splice(index, 1);
    }
    return false;
  };

  return users.find(deleteUser);
};

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
