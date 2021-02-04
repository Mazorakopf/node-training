import { celebrate, Joi, Segments } from 'celebrate';
import { VALIDATION_OPTIONS } from '../utils/common';

export const numericArrayValidator = celebrate({
    [Segments.BODY]: Joi.array().items(Joi.number()).min(1).unique()
}, VALIDATION_OPTIONS);

export const queryParamValidator = celebrate({
    [Segments.QUERY]: {
        limit: Joi.number(),
        groupId: Joi.number(),
        userId: Joi.number(),
        permissionId: Joi.number(),
        sort: Joi.string().valid('ASC', 'DESC')
    }
}, { abortEarly: false, allowUnknown: true });
