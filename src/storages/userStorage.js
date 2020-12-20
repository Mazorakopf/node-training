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
        .sort(compare)
        .slice(0, limit);
}

const compare = (user1, user2) => {
    const firstLogin = user1.login.toLocaleLowerCase();
    const secondLogin = user2.login.toLocaleLowerCase();
    if (firstLogin > secondLogin) {
        return 1;
    } else if (firstLogin < secondLogin) {
        return -1;
    }
    return 0;
};
