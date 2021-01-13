import { Router } from 'express';
import validate from '../utils/validator';
import * as UserService from './service';
import * as UserValidation from './validation';

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
        const user = await UserService.create(req.body);
        return res.json(user);
    } catch (err) {
        return next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const updated = await UserService.update(req.params.id, req.body);
        return updated ? res.json({ updated: true }) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await UserService.remove(req.params.id);
        return deleted ? res.json({ deleted: true }) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

const checkId = (req, res, next, id) => {
    req.params.id = Number(id);
    return isNaN(req.params.id)
        ? res.sendStatus(400)
        : next();
};

export const router = Router();
export const path = '/users';

router.route('/')
    .get(findAll)
    .post(validate(UserValidation), create);

router.param('id', checkId);

router.route('/:id')
    .get(findById)
    .put(validate(UserValidation), update)
    .delete(remove);
