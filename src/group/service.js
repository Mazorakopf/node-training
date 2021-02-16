import * as GroupDao from './dao';

export const create = async (group) => {
    return await GroupDao.save(group);
};

export const findById = async (groupId) => {
    return await GroupDao.findById(groupId);
};

export const findByQuery = async (query) => {
    const groups = await GroupDao.findByQuery(query);
    return mapList(groups);
};

export const update = async (group, updatedGroup) => {
    await GroupDao.update(group, updatedGroup);
};

export const remove = async (group) => {
    await GroupDao.remove(group);
};

export const addUsers = async (group, userIds) => {
    const addeddUserIds = await GroupDao.addUsers(group, userIds);
    return {
        success: addeddUserIds,
        failures: userIds.filter((v) => !addeddUserIds.includes(v))
    };
};

export const mapOrNull = (group) => {
    return group
        ? {
              id: group.id,
              name: group.name
          }
        : null;
};

const mapList = (groups) => groups.map(mapOrNull);
