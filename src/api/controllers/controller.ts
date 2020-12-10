import { Request, Response, NextFunction, Router, response } from 'express';

export default interface Controller {
    readonly path: string;
    readonly router: Router;
}