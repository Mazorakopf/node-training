import bcrypt from 'bcrypt';
import config from 'config';
import * as UserDao from './dao';

export const mapOrNull = (user) =>
    user
        ? {
              id: user.id,
              login: user.login,
              age: user.age
          }
        : null;

const mapList = (users) => users.map(mapOrNull);

const encryptSensitiveData = async (user) => {
    const salt = await bcrypt.genSalt(config.get('saltRounds'));
    user.password = await bcrypt.hash(user.password, salt);
    return user;
};

export const create = (user) => UserDao.save(encryptSensitiveData(user));

export const findById = (userId) => UserDao.findById(userId);

export const findByQuery = async (query) => {
    const users = await UserDao.findByQuery(query);
    return mapList(users);
};

export const update = (user, updatedUser) => {
    UserDao.update(user, encryptSensitiveData(updatedUser));
};

export const remove = (user) => {
    UserDao.remove(user);
};
