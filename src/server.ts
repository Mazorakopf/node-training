import UserController from './api/controllers/user.controller';
import App from './api/app';
import config from 'config';

const app = new App(
    [
        new UserController()
    ], config.get('server.port'));

app.listen();
