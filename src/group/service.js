import * as GroupDao from './dao';

export const create = async (group) => {
    return GroupDao.save(group)
        .then(mapOrNull);
};

export const findById = async (groupId) => {
    return GroupDao.findById(groupId)
        .then(mapOrNull);
};

export const findAll = async () => {
    return GroupDao.findAll()
        .then(mapList);
};

export const update = async (groupId, group) => {
    return GroupDao.update(groupId, group)
        .then(rowsUpdated => rowsUpdated > 0);
};

export const remove = async (groupId) => {
    return GroupDao.remove(groupId)
        .then(rowsDeleted => rowsDeleted > 0);
};

const mapOrNull = (group) => {
    return group
        ? { id: group.id, name: group.name, permissions: group.permissions.map(p => p.name) }
        : null;
};

const mapList = (users) => users.map(mapOrNull);

