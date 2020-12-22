export default class UserStorage {
    storage = new Map();
    currentId = 0;

    save = (user) => {
        user.id = this.currentId++;
        this.storage.set(user.id, user);
    }

    getById = (id) => {
        const user = this.storage.get(id);
        return user && !user.isDeleted ? user : null;
    }

    getAll = () => {
        return Array.from(this.storage.values()).filter((user) => user && !user.isDeleted);
    }

    update = (id, user) => {
        user.id = id;
        this.storage.set(user.id, user);
    }

    remove = (user) => {
        user.isDeleted = true;
    }

    getByLogin = (login, limit) => {
        return this.getAll()
            .filter((user) => user.login.includes(login))
            .sort(this.#compare)
            .slice(0, limit);
    }

    #compare = (user1, user2) => {
        const firstLogin = user1.login.toLocaleLowerCase();
        const secondLogin = user2.login.toLocaleLowerCase();
        if (firstLogin > secondLogin) {
            return 1;
        } else if (firstLogin < secondLogin) {
            return -1;
        }
        return 0;
    }
}

