import config from 'config';
import express from 'express';
import * as UserController from './user/controller';

const app = express();
const port = process.env.PORT || config.get('server.port');

app.use(express.json());
app.use(`/api${UserController.path}`, UserController.router);

app.listen(port, () => console.log(`App listening on the port ${port}`));
