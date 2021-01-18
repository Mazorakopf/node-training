import { celebrate, Joi, Segments } from 'celebrate';
import { VALIDATION_OPTIONS } from '../utils/common';

export default celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.number().strip(),
        name: Joi.string().required(),
        permissions: Joi.array().items(
            Joi.number().min(1).max(5).required()
        )
    })
}, VALIDATION_OPTIONS);
