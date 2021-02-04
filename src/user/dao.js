import { Group, User } from '../utils/database';
import { Op } from 'sequelize';

export const save = async (user) => {
    const createdUser = await User.create(user, { fields: ['login', 'password', 'age'] });
    return createdUser.id;
};

export const findById = (userId) => {
    return User.findOne({
        where: { id: userId, is_deleted: false },
        include: Group
    });
};

export const findAll = (resultLimit) => {
    return User.findAll({
        where: { is_deleted: false },
        include: Group,
        limit: resultLimit
    });
};

export const update = (userId, user) => {
    return User.update(user, {
        where: { id: userId, is_deleted: false }
    });
};

export const remove = (userId) => {
    return User.update({ isDeleted: true }, {
        where: { id: userId, is_deleted: false }
    });
};

export const findByLogin = (userLogin, resultLimit) => {
    return User.findAll({
        where: { login: { [Op.like]: `${userLogin}%` }, is_deleted: false },
        include: Group,
        order: [['login', 'ASC']],
        limit: resultLimit
    });
};
