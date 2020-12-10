import express from 'express';
import bodyParser from 'body-parser';
import Controller from './controllers/controller';

export default class App {

    private app: express.Application;

    constructor(controllers: Controller[], private port: number) {
        this.app = express();

        this.initMiddleWares();
        this.initControllers(controllers);
    }

    private initMiddleWares() {
        this.app.use(bodyParser.json());
    }

    private initControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
