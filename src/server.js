import config from 'config';
import express from 'express';
import cors from 'cors';
import { sequelize } from './utils/database';
import * as UserController from './user/controller';
import * as PermissionController from './permission/controller';
import * as GroupController from './group/controller';
import * as SecurityController from './oauth/controller';
import handleErrors from './middleware/errors';
import { logAllReq, logFailedReq } from './middleware/logger';
import { verifyAccessToken } from './middleware';
import logger from './utils/logger';

const app = express();
const port = process.env.PORT || config.get('server.port');

app.use(cors());
app.use(express.json());
app.use(logAllReq);
app.use(`${SecurityController.path}`, SecurityController.router);
app.use(verifyAccessToken);
app.use(`/api${UserController.path}`, UserController.router);
app.use(`/api${PermissionController.path}`, PermissionController.router);
app.use(`/api${GroupController.path}`, GroupController.router);
app.use(logFailedReq);
app.use(handleErrors);

sequelize.sync().then(() => app.listen(port, () => logger.info(`App listening on the port ${port}`)));
