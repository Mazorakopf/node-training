import { Router } from 'express';
import { ID_PARAM } from '../utils/common';
import * as PermissionService from './service';
import { buildQuery, findModel } from '../middleware';
import { queryParamValidator } from '../middleware/validators';

const findById = async (req, res, next) => {
    try {
        return res.json(PermissionService.mapOrNull(req.params.model));
    } catch (err) {
        return next(err);
    }
};

const findByQuery = async (req, res, next) => {
    try {
        const group = await PermissionService.findByQuery(req.query);
        return res.json(group);
    } catch (err) {
        return next(err);
    }
};

export const router = Router();
export const path = '/permissions';

const paramAttrMap = {
    groupId: '$groups.id$'
};

router.route('').get(queryParamValidator, buildQuery(paramAttrMap), findByQuery);

router.route(`/${ID_PARAM}`).all(findModel(PermissionService)).get(findById);
