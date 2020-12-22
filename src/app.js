import express from 'express';

export default class App {
    constructor(controllers, port) {
        this.port = port;
        this.app = express();

        this.#initMiddleWares();
        this.#initControllers(controllers);
    }

    #initMiddleWares = () => {
        this.app.use(express.json());
    }

    #initControllers = (controllers) => {
        controllers.forEach((controller) => {
            this.app.use(`/api${controller.path}`, controller.router);
        });
    }

    listen = () => {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
