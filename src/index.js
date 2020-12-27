import UserController from './user/controller';
import App from './app';

const app = new App(
    [
        new UserController()
    ], 3000);

app.listen();
