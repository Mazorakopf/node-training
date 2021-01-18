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
    return res.status(400).json({ errors: details });
};

const handleSequelizeErrors = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        const details = [];
        for (const error of err.errors) {
            details.push({ path: error.path, value: error.value, message: error.message });
        }
        return res.status(400).json({ errors: details });
    }
    return next(err);
};

const handleAllErrors = (err, req, res, next) => {
    console.error(err.stack);
    return res.sendStatus(500);
};

export default [handleCelebrateErrors, handleSequelizeErrors, handleAllErrors];
