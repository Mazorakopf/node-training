import { Router } from 'express';
import { buildQuery, findModel } from '../middleware';
import { queryParamValidator } from '../middleware/validators';
import { ID_PARAM } from '../utils/common';
import * as UserService from './service';
import userValidator from './validator';

export const router = Router();
export const path = '/users';

export const findByQuery = async (req, res, next) => {
    try {
        const users = await UserService.findByQuery(req.query);
        return res.json(users);
    } catch (err) {
        return next(err);
    }
};

export const findById = async (req, res, next) => {
    try {
        return res.json(UserService.mapOrNull(req.params.model));
    } catch (err) {
        return next(err);
    }
};

export const create = async (req, res, next) => {
    try {
        const id = await UserService.create(req.body);
        return res.location(`${path}/${id}`).sendStatus(201);
    } catch (err) {
        return next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        await UserService.update(req.params.model, req.body);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        await UserService.remove(req.params.model);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
};

const paramAttrMap = {
    login: 'login',
    groupId: '$groups.id$'
};

const allowedParamValue = {
    orderBy: ['login', 'age']
};

router
    .route('/')
    .get(queryParamValidator, buildQuery(paramAttrMap, allowedParamValue), findByQuery)
    .post(userValidator, create);

router.route(`/${ID_PARAM}`).all(findModel(UserService)).get(findById).put(userValidator, update).delete(remove);
