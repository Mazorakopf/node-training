import UserModel from './model';
import { Op } from 'sequelize';

export const save = async (user) => {
    return UserModel.create(user, { fields: ['login', 'password', 'age'] });
};

export const findById = async (userId) => {
    return UserModel.findOne({
        where: { id: userId, isDeleted: false }
    });
};

export const findAll = async () => {
    return UserModel.findAll({
        where: { isDeleted: false }
    });
};

export const update = async (userId, user) => {
    return UserModel.update(user, {
        where: { id: userId, isDeleted: false }
    });
};

export const remove = async (userId) => {
    return UserModel.update({
        isDeleted: true
    }, {
        where: { id: userId, isDeleted: false }
    });
};

export const findByLogin = async (userLogin, resultLimit) => {
    return UserModel.findAll({
        where: { login: { [Op.like]: `${userLogin}%` }, isDeleted: false },
        order: [['login', 'ASC']],
        limit: resultLimit
    });
};

