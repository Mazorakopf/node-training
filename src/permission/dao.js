import { Permission } from '../utils/database';

export const findById = (permissionId) => {
    return Permission.findOne({
        where: { id: permissionId }
    });
};

export const findAll = () => {
    return Permission.findAll();
};
