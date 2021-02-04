import { isCelebrateError } from 'celebrate';
import { ValidationError } from 'sequelize/lib/errors';
import { NotSupportedQueryParamsError, NotSupportedQueryValueError } from '../exception';

const handleCelebrateErrors = (err, req, res, next) => {
    if (!isCelebrateError(err)) {
        return next(err);
    }
    const details = [];
    for (const [key, value] of err.details) {
        details.push({ segment: key, messages: value.message });
    }
    return res.status(400).json(errorObject('Validation error', details, req.originalUrl));
};

const handleSequelizeErrors = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        const details = [];
        for (const error of err.errors) {
            details.push({ path: error.path, value: error.value, message: error.message });
        }
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

const handleAllErrors = (err, req, res, next) => {
    return res.status(500).json(errorObject('Internal server error', err.message, req.originalUrl));
};

const errorObject = (err, eDetails, ePath) => {
    return {
        timestamp: new Date().toISOString(),
        error: err,
        details: eDetails,
        path: ePath
    };
};

export default [
    handleCelebrateErrors,
    handleSequelizeErrors,
    handleNotSupportedQueryParamsError,
    handleNotSupportedQueryValueError,
    handleAllErrors
];
