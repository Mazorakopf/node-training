import * as GroupDao from './dao';

export const mapOrNull = (group) => {
    return group
        ? {
              id: group.id,
              name: group.name
          }
        : null;
};

const mapList = (groups) => groups.map(mapOrNull);

export const create = (group) => GroupDao.save(group);

export const findById = (groupId) => GroupDao.findById(groupId);

export const findByQuery = async (query) => {
    const groups = await GroupDao.findByQuery(query);
    return mapList(groups);
};

export const update = (group, updatedGroup) => {
    GroupDao.update(group, updatedGroup);
};

export const remove = (group) => {
    GroupDao.remove(group);
};

export const addUsers = async (group, userIds) => {
    const addeddUserIds = await GroupDao.addUsers(group, userIds);
    return {
        success: addeddUserIds,
        failures: userIds.filter((v) => !addeddUserIds.includes(v))
    };
};
