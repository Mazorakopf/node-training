import * as GroupDao from './dao';

export const create = async (group) => {
    return await GroupDao.save(group);
};

export const findById = async (groupId) => {
    const group = await GroupDao.findById(groupId);
    return mapOrNull(group);
};

export const findAll = async () => {
    const groups = await GroupDao.findAll();
    return mapList(groups);
};

export const update = async (groupId, group) => {
    const rowsUpdated = await GroupDao.update(groupId, group);
    return rowsUpdated > 0;
};

export const remove = async (groupId) => {
    const rowsDeleted = await GroupDao.remove(groupId);
    return rowsDeleted > 0;
};

export const addUsers = async (groupId, userIds) => {
    await GroupDao.addUsers(groupId, userIds);
};

const mapOrNull = (group) => {
    return group ? {
        id: group.id,
        name: group.name,
        permissions: group.permissions.map(p => {
            return {
                id: p.id,
                name: p.name
            };
        })
    } : null;
};

const mapList = (groups) => groups.map(mapOrNull);
