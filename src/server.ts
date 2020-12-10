import UserController from './api/controllers/user.controller';
import App from './api/app';

const app = new App(
    [
        new UserController()
    ], 3000);

app.listen();
