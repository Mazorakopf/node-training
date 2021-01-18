import { celebrate, Joi, Segments } from 'celebrate';
import { VALIDATION_OPTIONS } from '../utils/common';

export default celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.number().strip(),
        login: Joi.string().email().required(),
        password: Joi.string().min(5).max(20).pattern(/[a-zA-Z0-9]/).required(),
        age: Joi.number().integer().min(4).max(130).required(),
        isDeleted: Joi.boolean().invalid(true).default(false)
    })
}, VALIDATION_OPTIONS);

