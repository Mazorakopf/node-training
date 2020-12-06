const storage = new Map();
let currentId = 0;

export function save(user) {
    user.id = currentId++;
    storage.set(user.id, user);
}

export function getById(id) {
    const user = storage.get(id);
    return user && !user.isDeleted ? user : null;
}

export function getAll() {
    return Array.from(storage.values()).filter((user) => user && !user.isDeleted);
}

export function update(id, user) {
    user.id = id;
    storage.set(user.id, user);
}

export function remove(user) {
    user.isDeleted = true;
}

export function getByLogin(login, limit) {
    return this.getAll()
        .filter((user) => user.login.includes(login))
        .sort()
        .slice(0, limit);
}
