import GroupModel from './model/group';
import PermissionModel from './model/permission';

export const save = async (group) => {
    return PermissionModel.findAll({
        where: { name: group.permissions }
    }).then(permissionList => GroupModel.create({
        name: group.name,
        permissions: permissionList
    }, {
        include: [PermissionModel]
    }));
};

export const findById = async (groupId) => {
    return GroupModel.findOne({
        where: { id: groupId }
    });
};

export const findAll = async () => {
    return GroupModel.findAll();
};

export const update = async (groupId, group) => {
    return PermissionModel.findAll({
        where: { name: group.permissions }
    }).then(permissionList => GroupModel.update({
        name: group.name,
        permissions: permissionList
    }, {
        include: [PermissionModel]
    }, {
        where: { id: groupId }
    }));
};

export const remove = async (groupId) => {
    return GroupModel.update({
        where: { id: groupId }
    });
};
