import * as UserDao from './dao';
import bcrypt from 'bcrypt';
import config from 'config';

export const create = async (user) => {
    return await UserDao.save(encryptSensitiveData(user));
};

export const findById = async (userId) => {
    return await UserDao.findById(userId);
};

export const findByQuery = async (query) => {
    const users = await UserDao.findByQuery(query);
    return mapList(users);
};

export const update = async (user, updatedUser) => {
    UserDao.update(user, encryptSensitiveData(updatedUser));
};

export const remove = async (user) => {
    UserDao.remove(user);
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

const encryptSensitiveData = async (user) => {
    const salt = await bcrypt.genSalt(config.get('saltRounds'));
    user.password = await bcrypt.hash(user.password, salt);
    return user;
};
