import UserController from './user/controller';
import GroupController from './group/controller';
import config from 'config';
import App from './app';

const app = new App(
    [
        new UserController(),
        new GroupController()
    ], process.env.PORT || config.get('server.port'));

app.listen();
