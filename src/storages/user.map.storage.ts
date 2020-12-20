import User from './../api/models/user';

export default class UserMapStorage {

    private readonly storage: Map<number, User>;
    private index: number;

    constructor() {
        this.storage = new Map();
        this.index = 0;
    }

    public save = (user: User) => {
        user.id = this.index++;
        this.storage.set(user.id, user);
    }

    public getById = (id: number) => {
        const user = this.storage.get(id);
        return user && !user.isDeleted ? user : null;
    }

    public getAll = () => {
        return Array.from(this.storage.values()).filter(
            (user) => user && !user.isDeleted
        );
    }

    public update = (id: number, newUser: User) => {
        const oldUser = this.getById(id);
        if (oldUser && !oldUser.isDeleted) {
            newUser.id = id;
            this.storage.set(newUser.id, newUser);
        }
        return oldUser != null;
    }

    public remove = (id: number) => {
        const user = this.getById(id);
        if (user) {
            user.isDeleted = true;
        }
        return user != null;
    }

    public getByLogin = (login: string, limit: number = Number.MAX_SAFE_INTEGER) => {
        return this.getAll()
            .filter((user) => user.login.includes(login))
            .sort(this.compare)
            .slice(0, limit);
    }

    private compare = (user1: User, user2: User) =>{
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
