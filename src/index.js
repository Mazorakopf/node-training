import UserController from './user/controller';
import UserStorage from './user/storage';
import * as validation from './user/validation';
import App from './app';

const app = new App(
    [
        new UserController(new UserStorage(), validation)
    ], 3000);

app.listen();
