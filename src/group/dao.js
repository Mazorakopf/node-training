import { Group, Permission, sequelize } from '../utils/database';

export const save = (group) => {
    return sequelize.transaction(async t => {
        const createdGroup = await Group.create({ name: group.name }, { transaction: t });
        await createdGroup.setPermissions(group.permissions, { transaction: t });
    });
};

export const findById = (groupId) => {
    return Group.findOne({
        where: { id: groupId },
        include: Permission
    });
};

export const findAll = () => {
    return Group.findAll({ include: Permission });
};

export const update = (groupId, group) => {
    return sequelize.transaction(async t => {
        const updatedGroup = await Group.findByPk(groupId, { transaction: t });
        if (updatedGroup === null) return 0;
        await updatedGroup.setPermissions(group.permissions, { transaction: t });
        await updatedGroup.update({ name: group.name }, { transaction: t });
        return 1;
    });
};

export const remove = (groupId) => {
    return Group.destroy({
        where: { id: groupId }
    });
};

export const addUsers = async (groupId, userIds) => {
    return sequelize.transaction(async t => {
        const group = await Group.findByPk(groupId, { transaction: t });
        await group.addUsers(userIds, { transaction: t });
    });
};
