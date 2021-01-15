import UserModel from './model';
import { Op } from 'sequelize';

export const save = (user) => {
    return UserModel.create(user, { fields: ['login', 'password', 'age'] });
};

export const findById = (userId) => {
    return UserModel.findOne({
        where: { id: userId, isDeleted: false }
    });
};

export const findAll = (resultLimit) => {
    return UserModel.findAll({
        where: { isDeleted: false },
        limit: resultLimit
    });
};

export const update = (userId, user) => {
    return UserModel.update(user, {
        where: { id: userId, isDeleted: false }
    });
};

export const remove = (userId) => {
    return UserModel.update({
        isDeleted: true
    }, {
        where: { id: userId, isDeleted: false }
    });
};

export const findByLogin = (userLogin, resultLimit) => {
    return UserModel.findAll({
        where: { login: { [Op.like]: `${userLogin}%` }, isDeleted: false },
        order: [['login', 'ASC']],
        limit: resultLimit
    });
};

