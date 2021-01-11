import express from 'express';

export default function App(controllers, port) {
    this._port = port;
    this._app = express();

    useMiddleWares(this._app);
    useControllers(this._app, controllers);
}

const useMiddleWares = (app) => {
    app.use(express.json());
};

const useControllers = (app, controllers) => {
    controllers.forEach((controller) => {
        app.use(`/api${controller.path}`, controller.router);
    });
};

App.prototype.listen = function listen() {
    this._app.listen(this._port, () => {
        console.log(`App listening on the port ${this._port}`);
    });
};
