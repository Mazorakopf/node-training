import express from 'express';
import validate from '../utils/validator';

export default class UserController {
    constructor(storage, validation) {
        this.storage = storage;
        this.validation = validation;
        this.router = express.Router();
        this.path = '/users';

        this.#initRoutes();
    }

    #initRoutes = () => {
        this.router
            .route('/')
            .get(this.#getAll)
            .post(validate(this.validation), this.#create);

        this.router.param('id', this.#resolveId);

        this.router
            .route('/:id')
            .get(this.#getById)
            .put(validate(this.validation), this.#update)
            .delete(this.#remove);
    }

    #getAll = (req, res) => {
        const login = req.query.login;
        const limit = req.query.limit || Number.MAX_SAFE_INTEGER;
        if (login) {
            return res.json(this.storage.getByLogin(login, limit).map(this.#mapDTO));
        }
        return res.json(this.storage.getAll().map(this.#mapDTO));
    }

    #getById = (req, res) => {
        return res.json(this.#mapDTO(req.params.user));
    }

    #create = (req, res) => {
        this.storage.save(req.body);
        return res.status(200).json({ created: true });
    }

    #update = (req, res) => {
        this.storage.update(req.params.id, req.body);
        return res.json({ updated: true });
    }

    #remove = (req, res) => {
        this.storage.remove(req.params.user);
        return res.json({ deleted: true });
    }

    #resolveId = (req, res, next, id) => {
        req.params.id = Number(id);
        const user = this.storage.getById(req.params.id);
        if (user && !user.isDeleted) {
            req.params.user = user;
            return next();
        }
        return res.sendStatus(404);
    }

    #mapDTO = (user) => {
        return {
            id: user.id,
            login: user.login,
            age: user.age
        };
    }
}
