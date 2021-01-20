import { Router } from 'express';
import { ID_PARAM } from '../utils/common';
import * as UserService from './service';
import userValidator from './validator';

const findAll = async (req, res, next) => {
    try {
        const users = await UserService.findAll(req.query.login, req.query.limit);
        return res.json(users);
    } catch (err) {
        return next(err);
    }
};

const findById = async (req, res, next) => {
    try {
        const user = await UserService.findById(req.params.id);
        return user ? res.json(user) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const id = await UserService.create(req.body);
        return res.location(`${path}/${id}`).sendStatus(201);
    } catch (err) {
        return next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const updated = await UserService.update(req.params.id, req.body);
        return updated ? res.sendStatus(204) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await UserService.remove(req.params.id);
        return deleted ? res.sendStatus(204) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

export const router = Router();
export const path = '/users';

router.route('/')
    .get(findAll)
    .post(userValidator, create);

router.route(`/${ID_PARAM}`)
    .get(findById)
    .put(userValidator, update)
    .delete(remove);
