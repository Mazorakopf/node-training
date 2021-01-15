import * as storage from '../../storages/userStorage';

export function getAll(req, res) {
    const login = req.query.login;
    const limit = req.query.limit || Number.MAX_SAFE_INTEGER;
    if (login) {
        return res.json(storage.getByLogin(login, limit).map(mapDTO));
    }
    return res.json(storage.getAll().map(mapDTO));
}

export function getById(req, res) {
    return res.json(mapDTO(req.params.user));
}

export function create(req, res) {
    storage.save(req.body);
    return res.status(200).json({ created: true });
}

export function update(req, res) {
    storage.update(req.params.id, req.body);
    return res.json({ updated: true });
}

export function remove(req, res) {
    storage.remove(req.params.user);
    return res.json({ deleted: true });
}

export function findUser(req, res, next, id) {
    req.params.id = Number(id);
    const user = storage.getById(req.params.id);
    if (user && !user.isDeleted) {
        req.params.user = user;
        return next();
    }
    return res.sendStatus(404);
}

const mapDTO = (user) => {
    return {
        id: user.id,
        login: user.login,
        age: user.age
    };
};
