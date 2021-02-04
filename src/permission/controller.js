import { Router } from 'express';
import { ID_PARAM } from '../utils/common';
import * as PermissionService from './service';

const findAll = async (req, res, next) => {
    try {
        const groups = await PermissionService.findAll();
        return res.json(groups);
    } catch (err) {
        return next(err);
    }
};

const findById = async (req, res, next) => {
    try {
        const group = await PermissionService.findById(req.params.id);
        return group ? res.json(group) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

export const router = Router();
export const path = '/permissions';

router.route('/').get(findAll);

router.route(`/${ID_PARAM}`).get(findById);
