import { Router } from 'express';
import validate from '../utils/validator';
import * as UserService from './service';
import * as UserValidation from './validation';

const initRoutes = () => {
    router
        .route('/')
        .get(findAll)
        .post(validate(UserValidation), create);

    router.param('id', checkId);

    router
        .route('/:id')
        .get(findById)
        .put(validate(UserValidation), update)
        .delete(remove);
};

const findAll = async (req, res) => {
    const login = req.query.login;
    const limit = req.query.limit || Number.MAX_SAFE_INTEGER;
    if (login) {
        return UserService.findByLogin(login, limit)
            .then(users => res.json(users));
    }
    return UserService.findAll()
        .then(users => res.json(users));
};

const findById = async (req, res) => {
    return UserService.findById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404));
};

const create = async (req, res) => {
    return UserService.create(req.body)
        .then(user => res.json(user));
};

const update = async (req, res) => {
    return UserService.update(req.params.id, req.body)
        .then(updated => updated ? res.json({ updated: true }) : res.sendStatus(404));
};

const remove = async (req, res) => {
    return UserService.remove(req.params.id)
        .then(user => user ? res.json({ deleted: true }) : res.sendStatus(404));
};

const checkId = (req, res, next, id) => {
    req.params.id = Number(id);
    return isNaN(req.params.id)
        ? res.sendStatus(400)
        : next();
};

export const router = Router();
export const path = '/users';

initRoutes();
