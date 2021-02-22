import { Op } from 'sequelize';
import { Group, Permission, User, sequelize } from '../utils/database';

export const save = (group) =>
    sequelize.transaction(async (t) => {
        const createdGroup = await Group.create({ name: group.name }, { transaction: t });
        await createdGroup.setPermissions(group.permissions, { transaction: t });
        return createdGroup.id;
    });

export const findById = (groupId) =>
    Group.findOne({
        where: { id: groupId },
        include: Permission
    });

export const findByQuery = (query) => {
    if (query.condition.name) {
        query.condition.name = { [Op.like]: `%${query.condition.name}%` };
    }
    return Group.findAll({
        where: query.condition,
        include: [
            { model: User, duplicating: false },
            { model: Permission, duplicating: false }
        ],
        order: [[query.other.orderBy || 'id', query.other.sort || 'ASC']],
        limit: query.other.limit || Number.MAX_SAFE_INTEGER
    });
};

export const update = (group, updatedGroup) =>
    sequelize.transaction(async (t) => {
        await group.setPermissions(updatedGroup.permissions, { transaction: t });
        await group.update({ name: updatedGroup.name }, { transaction: t });
    });

export const remove = (group) => group.destroy();

export const addUsers = (group, userIds) =>
    sequelize.transaction(async (t) => {
        const existingUserIds = await User.findAll({ where: { id: userIds, is_deleted: false } });
        await group.addUsers(existingUserIds, { transaction: t });
        return existingUserIds.map((obj) => obj.id);
    });
