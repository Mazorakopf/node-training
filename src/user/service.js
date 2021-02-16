import * as UserDao from './dao';

export const create = async (user) => {
    return await UserDao.save(user);
};

export const findById = async (userId) => {
    return await UserDao.findById(userId);
};

export const findByQuery = async (query) => {
    const users = await UserDao.findByQuery(query);
    return mapList(users);
};

export const update = async (user, updatedUser) => {
    await UserDao.update(user, updatedUser);
};

export const remove = async (user) => {
    await UserDao.remove(user);
};

export const mapOrNull = (user) => {
    return user
        ? {
              id: user.id,
              login: user.login,
              age: user.age
          }
        : null;
};

const mapList = (users) => users.map(mapOrNull);
