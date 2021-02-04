import * as UserDao from './dao';

export const create = async (user) => {
    return await UserDao.save(user);
};

export const findById = async (userId) => {
    const user = await UserDao.findById(userId);
    return mapOrNull(user);
};

export const findAll = async (login, limit = Number.MAX_SAFE_INTEGER) => {
    const users = login
        ? await UserDao.findByLogin(login, limit)
        : await UserDao.findAll(limit);
    return mapList(users);
};

export const update = async (userId, user) => {
    const rowsUpdated = await UserDao.update(userId, user);
    return rowsUpdated > 0;
};

export const remove = async (userId) => {
    const rowsDeleted = await UserDao.remove(userId);
    return rowsDeleted > 0;
};

const mapOrNull = (user) => {
    return user ? {
        id: user.id,
        login: user.login,
        age: user.age,
        groups: user.groups.map(g => {
            return {
                id: g.id,
                name: g.name
            };
        })
    } : null;
};

const mapList = (users) => users.map(mapOrNull);

