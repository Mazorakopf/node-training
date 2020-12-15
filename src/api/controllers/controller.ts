import { Router } from 'express';

export default interface Controller {
    readonly path: string;
    readonly router: Router;
}
