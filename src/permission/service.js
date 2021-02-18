import * as PermissionDao from './dao';

export const mapOrNull = (permission) =>
    permission
        ? {
              id: permission.id,
              name: permission.name
          }
        : null;

const mapList = (permissions) => permissions.map(mapOrNull);

export const findById = async (id) => {
    const permission = await PermissionDao.findById(id);
    return mapOrNull(permission);
};

export const findByQuery = async (query) => {
    const permissions = await PermissionDao.findByQuery(query);
    return mapList(permissions);
};
