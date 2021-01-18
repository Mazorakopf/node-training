import { Router } from 'express';
import { ID_PARAM } from '../utils/common';
import { numericArrayValidator } from '../middleware/validators';
import * as GroupService from './service';
import groupValidator from './validator';

const findAll = async (req, res, next) => {
    try {
        const groups = await GroupService.findAll();
        return res.json(groups);
    } catch (err) {
        return next(err);
    }
};

const findById = async (req, res, next) => {
    try {
        const group = await GroupService.findById(req.params.id);
        return group ? res.json(group) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

const create = async (req, res, next) => {
    try {
        await GroupService.create(req.body);
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const updated = await GroupService.update(req.params.id, req.body);
        return updated ? res.sendStatus(200) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await GroupService.remove(req.params.id);
        return deleted ? res.sendStatus(200) : res.sendStatus(404);
    } catch (err) {
        return next(err);
    }
};

const addUsers = async (req, res, next) => {
    try {
        await GroupService.addUsers(req.params.id, req.body);
        return res.json(200);
    } catch (err) {
        return next(err);
    }
};

export const router = Router();
export const path = '/groups';

router.route('/')
    .get(findAll)
    .post(groupValidator, create);

router.route(`/${ID_PARAM}`)
    .get(findById)
    .put(groupValidator, update)
    .delete(remove);

router.route(`/${ID_PARAM}/users`)
    .post(numericArrayValidator, addUsers);
