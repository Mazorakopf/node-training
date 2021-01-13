import { Router } from 'express';
import validate from '../utils/validator';
import * as GroupService from './service';
import * as GroupValidation from './validation';

const initRoutes = () => {
    router
        .route('/')
        .get(findAll)
        .post(validate(GroupValidation), create);

    router.param('id', checkId);

    router
        .route('/:id')
        .get(findById)
        .put(validate(GroupValidation), update)
        .delete(remove);
};

const findAll = async (req, res) => {
    return GroupService.findAll()
        .then(users => res.json(users));
};

const findById = async (req, res) => {
    return GroupService.findById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404));
};

const create = async (req, res) => {
    return GroupService.create(req.body)
        .then(user => res.json(user));
};

const update = async (req, res) => {
    return GroupService.update(req.params.id, req.body)
        .then(updated => updated ? res.json({ updated: true }) : res.sendStatus(404));
};

const remove = async (req, res) => {
    return GroupService.remove(req.params.id)
        .then(user => user ? res.json({ deleted: true }) : res.sendStatus(404));
};

const checkId = (req, res, next, id) => {
    req.params.id = Number(id);
    return isNaN(req.params.id)
        ? res.sendStatus(400)
        : next();
};

export const router = Router();
export const path = '/groups';

initRoutes();