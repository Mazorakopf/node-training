import { celebrate, Joi, Segments } from 'celebrate';
import { VALIDATION_OPTIONS } from '../utils/common';

export const numericArrayValidator = celebrate({
    [Segments.BODY]: Joi.array().items(Joi.number()).min(1).unique()
}, VALIDATION_OPTIONS);
