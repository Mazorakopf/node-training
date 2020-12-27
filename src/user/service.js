import * as UserDao from './dao';

export const create = async (user) => {
    return UserDao.save(user)
        .then(mapOrNull);
};

export const findById = async (userId) => {
    return UserDao.findById(userId)
        .then(mapOrNull);
};

export const findAll = async () => {
    return UserDao.findAll()
        .then(mapList);
};

export const update = async (userId, user) => {
    return UserDao.update(userId, user)
        .then(rowsUpdated => rowsUpdated > 0);
};

export const remove = async (userId) => {
    return UserDao.remove(userId)
        .then(rowsDeleted => rowsDeleted > 0);
};

export const findByLogin = async (login, limit) => {
    return UserDao.findByLogin(login, limit)
        .then(mapList);
};

const mapOrNull = (user) => {
    return user
        ? { id: user.id, login: user.login, age: user.age }
        : null;
};

const mapList = (users) => users.map(mapOrNull);

