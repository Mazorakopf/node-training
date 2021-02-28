import { Router } from 'express';
import { ID_PARAM } from '../utils/common';
import { numericArrayValidator, queryParamValidator } from '../middleware/validators';
import * as GroupService from './service';
import groupValidator from './validator';
import { buildQuery, findModel } from '../middleware';

export const router = Router();
export const path = '/groups';

export const findByQuery = async (req, res, next) => {
    try {
        const groups = await GroupService.findByQuery(req.query);
        return res.json(groups);
    } catch (err) {
        return next(err);
    }
};

export const findById = async (req, res, next) => {
    try {
        return res.json(GroupService.mapOrNull(req.params.model));
    } catch (err) {
        return next(err);
    }
};

export const create = async (req, res, next) => {
    try {
        const id = await GroupService.create(req.body);
        return res.location(`${path}/${id}`).sendStatus(201);
    } catch (err) {
        return next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        await GroupService.update(req.params.model, req.body);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        await GroupService.remove(req.params.model);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
};

export const addUsers = async (req, res, next) => {
    try {
        const response = await GroupService.addUsers(req.params.model, req.body);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
};

const paramAttrMap = {
    userId: '$users.id$',
    permissionId: '$permissions.id$',
    name: 'name'
};

const allowedParamValue = {
    orderBy: ['name']
};

router
    .route('/')
    .get(queryParamValidator, buildQuery(paramAttrMap, allowedParamValue), findByQuery)
    .post(groupValidator, create);

router.route(`/${ID_PARAM}`).all(findModel(GroupService)).get(findById).put(groupValidator, update).delete(remove);

router.route(`/${ID_PARAM}/users`).post(numericArrayValidator, findModel(GroupService), addUsers);
