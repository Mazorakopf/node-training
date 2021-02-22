import { isCelebrateError } from 'celebrate';
import { ValidationError } from 'sequelize/lib/errors';
import {
    ForbiddenErrorResponse,
    NotSupportedQueryParamsError,
    NotSupportedQueryValueError,
    UnauthorizedErrorResponse
} from '../exception';

const errorObject = (err, eDetails, ePath) => ({
    timestamp: new Date().toISOString(),
    error: err,
    details: eDetails,
    path: ePath
});

const handleCelebrateErrors = (err, req, res, next) => {
    if (!isCelebrateError(err)) {
        return next(err);
    }
    const details = [];
    err.details.forEach((value, key) => details.push({ segment: key, messages: value.message }));
    return res.status(400).json(errorObject('Validation error', details, req.originalUrl));
};

const handleSequelizeErrors = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        const details = [];
        err.errors.forEach((e) => details.push({ path: e.path, value: e.value, message: e.message }));
        return res.status(400).json(errorObject('Validation error', details, req.originalUrl));
    }
    return next(err);
};

const handleNotSupportedQueryParamsError = (err, req, res, next) => {
    if (err instanceof NotSupportedQueryParamsError) {
        return res.status(400).json(errorObject('Validation error', err.message, req.originalUrl));
    }
    return next(err);
};

const handleNotSupportedQueryValueError = (err, req, res, next) => {
    if (err instanceof NotSupportedQueryValueError) {
        return res.status(400).json(errorObject('Validation error', err.message, req.originalUrl));
    }
    return next(err);
};

const handleUnauthorizedErrorResponse = (err, req, res, next) => {
    if (err instanceof UnauthorizedErrorResponse) {
        return res.status(401).json(errorObject('Unauthorized error', err.message, req.originalUrl));
    }
    return next(err);
};

const handleForbiddenErrorResponse = (err, req, res, next) => {
    if (err instanceof ForbiddenErrorResponse) {
        return res.status(403).json(errorObject('Forbidden', err.message, req.originalUrl));
    }
    return next(err);
};

const handleAllErrors = (err, req, res) =>
    res.status(500).json(errorObject('Internal server error', err.message, req.originalUrl));

export default [
    handleCelebrateErrors,
    handleSequelizeErrors,
    handleNotSupportedQueryParamsError,
    handleNotSupportedQueryValueError,
    handleUnauthorizedErrorResponse,
    handleForbiddenErrorResponse,
    handleAllErrors
];
