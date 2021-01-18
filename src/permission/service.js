import * as PermissionDao from './dao';

export const findById = async (groupId) => {
    const permission = await PermissionDao.findById(groupId);
    return mapOrNull(permission);
};

export const findAll = async () => {
    const permissions = await PermissionDao.findAll();
    return mapList(permissions);
};

const mapOrNull = (permission) => {
    return permission ? {
        id: permission.id,
        name: permission.name
    } : null;
};

const mapList = (permissions) => permissions.map(mapOrNull);
