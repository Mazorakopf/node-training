import UserController from './user/controller';
import config from 'config';
import App from './app';

const app = new App(
    [
        new UserController()
    ], process.env.PORT || config.get('server.port'));

app.listen();
