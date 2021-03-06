import { Op } from 'sequelize';
import { Group, User } from '../utils/database';

export const save = async (user) => {
    const createdUser = await User.create(user, { fields: ['login', 'password', 'age'] });
    return createdUser.id;
};

export const findById = (userId) =>
    User.findOne({
        where: { id: userId, isDeleted: false },
        include: Group
    });

export const update = (oldUser, newUser) => {
    oldUser.update(newUser);
};

export const remove = (user) => {
    user.update({ isDeleted: true });
};

export const findByQuery = (query) => {
    query.condition.isDeleted = false;
    if (query.condition.login) {
        query.condition.login = { [Op.like]: `${query.condition.login}%` };
    }
    return User.findAll({
        where: query.condition,
        include: { model: Group, duplicating: false },
        order: [[query.other.orderBy || 'id', query.other.sort || 'ASC']],
        limit: query.other.limit || Number.MAX_SAFE_INTEGER
    });
};
