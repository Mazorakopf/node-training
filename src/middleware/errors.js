import { isCelebrateError } from 'celebrate';
import { ValidationError } from 'sequelize/lib/errors';

const handleCelebrateErrors = (err, req, res, next) => {
    if (!isCelebrateError(err)) {
        return next(err);
    }
    const details = [];
    for (const [key, value] of err.details) {
        details.push({ segment: key, messages: value.message });
    }
    return res.status(400).json(errorObject(400, 'Validation error', details, req.originalUrl));
};

const handleSequelizeErrors = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        const details = [];
        for (const error of err.errors) {
            details.push({ path: error.path, value: error.value, message: error.message });
        }
        return res.status(400).json(errorObject(400, 'Validation error', details, req.originalUrl));
    }
    return next(err);
};

const handleAllErrors = (err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json(errorObject(500, 'Internal server error', null, req.originalUrl));
};

const errorObject = (eStatus, err, eDetails, ePath) => {
    return {
        timestamp: new Date().toISOString(),
        status: eStatus,
        error: err,
        details: eDetails,
        path: ePath
    };
};

export default [handleCelebrateErrors, handleSequelizeErrors, handleAllErrors];
