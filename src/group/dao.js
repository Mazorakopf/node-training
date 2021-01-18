import { Group, Permission, sequelize } from '../utils/database';

export const save = (group) => {
    sequelize.transaction(async t => {
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
        const updatedGroup = await this.findById(groupId);
        updatedGroup.setPermissions(group.permissions);
        return Group.update({ name: group.name }, {
            where: { id: groupId },
            transaction: t
        });
    });
};

export const remove = (groupId) => {
    return Group.destroy({
        where: { id: groupId }
    });
};

export const addUsers = async (groupId, userIds) => {
    sequelize.transaction(async t => {
        const group = await Group.findByPk(groupId, { transaction: t });
        await group.addUsers(userIds, { transaction: t });
    });
};
