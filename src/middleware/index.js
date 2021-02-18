import jwt from 'jsonwebtoken';
import config from 'config';
import {
    ForbiddenErrorResponse,
    NotSupportedQueryParamsError,
    NotSupportedQueryValueError,
    UnauthorizedErrorResponse
} from '../exception';

const otherQueryParam = ['limit', 'orderBy', 'sort'];

export const buildQuery = (paramAttrMap, allowedParamValue) => (req, res, next) => {
    const query = { condition: {}, other: {} };
    const failed = [];

    for (const [param, value] of Object.entries(req.query)) {
        if (allowedParamValue && allowedParamValue[param] && !allowedParamValue[param].includes(value)) {
            return next(new NotSupportedQueryValueError(param, value, allowedParamValue[param]));
        }

        if (otherQueryParam.includes(param)) {
            query.other[param] = value;
            continue;
        }

        const attribute = paramAttrMap[param];
        if (!attribute) {
            failed.push(param);
        } else {
            query.condition[attribute] = value;
        }
    }

    if (Array.isArray(failed) && failed.length) {
        return next(new NotSupportedQueryParamsError(failed));
    }

    req.query = query;
    return next();
};

export const findModel = (service) => async (req, res, next) => {
    try {
        const model = await service.findById(req.params.id);
        if (!model) {
            return res.sendStatus(404);
        }
        req.params.model = model;
        return next();
    } catch (err) {
        return next(err);
    }
};

export const verifyAccessToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new UnauthorizedErrorResponse());
    }

    const [type, accessToken] = req.headers.authorization.split(/\s+/);
    if (type !== 'Bearer' || !accessToken) {
        return next(new UnauthorizedErrorResponse());
    }

    jwt.verify(accessToken, config.get('security.accessTokenSecret'), (err) => {
        if (err) {
            return next(new ForbiddenErrorResponse());
        }
        return next();
    });
};
