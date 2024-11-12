import users from "../data/users.data";

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

const getAll = () => {
  return users;
};

const insert = (details) => {
  const newUser = { id: users.length + 1, ...details };
  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  const index = users.findIndex((user) => user && user.id === userId);

  if (index !== -1) {
    const deletedUser = users[index];
    users.splice(index, 1);
    return deletedUser;
  }
  return false;
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
