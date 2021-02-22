import { Router } from 'express';
import * as SecurityService from './service';
import { validateAuthenticateRequest, validateRefreshTokenRequest } from './validator';

export const router = Router();
export const path = '/oauth';

const authenticate = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const response = await SecurityService.authenticate(login, password);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
};

const refresh = async (req, res, next) => {
    try {
        const response = await SecurityService.refreshAccessToken(req.body.refresh_token);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
};

router.route('/token').post(validateAuthenticateRequest, authenticate);
router.route('/token/refresh').post(validateRefreshTokenRequest, refresh);
