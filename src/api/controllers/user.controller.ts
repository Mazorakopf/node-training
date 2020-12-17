import { Request, Response, NextFunction, Router } from 'express';
import UserMapStorage from '../../storages/user.map.storage';
import Validator from '../validations/validator';
import UserValidation from '../validations/user.validation';
import Controller from './controller';
import User from '../models/user';
export default class UserController implements Controller {

    public readonly path: string;
    public readonly router: Router;

    private readonly validation: UserValidation;
    private readonly mapStorage: UserMapStorage;

    constructor() {
        this.path = '/users';
        this.router = Router();
        this.validation = new UserValidation();
        this.mapStorage = new UserMapStorage();

        this.initRouters();
    }

    private initRouters() {
        this.router.route('/')
            .get(this.getAll)
            .post(Validator.validate(this.validation), this.create);


        this.router.route('/login')
            .get(this.checkLoginAndLimit, this.getByLogin);

        this.router.route('/:id')
            .all(this.checkId)
            .get(this.getById)
            .put(Validator.validate(this.validation), this.update)
            .delete(this.remove);
    }

    private getAll = (req: Request, res: Response) => {
        return res.json(this.mapStorage.getAll().map(this.mapDTO));
    };

    private getById = (req: Request, res: Response) => {
        const userId = Number(req.params.id);
        const user = this.mapStorage.getById(userId);
        return user ? res.json(this.mapDTO(user)) : res.sendStatus(404);
    };

    private create = (req: Request, res: Response) => {
        this.mapStorage.save(req.body);
        return res.json({ created: true });
    };

    private update = (req: Request, res: Response) => {
        const userId = Number(req.params.id);
        const updated = this.mapStorage.update(userId, req.body);
        return updated ? res.json({ updated: true}) : res.sendStatus(404);
    };

    private remove = (req: Request, res: Response) => {
        const userId = Number(req.params.id);
        const deleted = this.mapStorage.remove(userId)
        return deleted ? res.json({ deleted: true }) : res.sendStatus(404);
    };

    private getByLogin = (req: Request, res: Response) => {
        const filter = req.query.filter as string;
        const limit = req.query.limit;
        if (limit) {
            return res.json(this.mapStorage.getByLogin(filter, Number(limit)).map(this.mapDTO));
        } else {
            return res.json(this.mapStorage.getByLogin(filter).map(this.mapDTO));
        }
    }

    private checkId = (req: Request, res: Response, next: NextFunction) => {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.sendStatus(400);
        }
        return next();
    };

    private checkLoginAndLimit(req: Request, res: Response, next: NextFunction) {
        const limit = Number(req.query.limit);
        if (req.query.limit && isNaN(limit)) {
            return res.sendStatus(400);
        }
        if (!req.query.filter) {
            return res.sendStatus(400)
        }
        next();
    }

    private mapDTO = (user: User) => {
        return {
            id: user.id,
            login: user.login,
            age: user.age
        }
    }
}
