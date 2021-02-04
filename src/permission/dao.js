import { Group, Permission } from '../utils/database';

export const findById = (permissionId) => {
    return Permission.findOne({
        where: { id: permissionId }
    });
};

export const findByQuery = (query) => {
    return Permission.findAll({
        where: query.condition,
        include: { model: Group, duplicating: false },
        limit: query.other.limit || Number.MAX_SAFE_INTEGER
    });
};
