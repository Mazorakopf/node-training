import { celebrate, Joi, Segments } from 'celebrate';
import { VALIDATION_OPTIONS } from '../utils/common';

export const validateAuthenticateRequest = celebrate(
    {
        [Segments.BODY]: Joi.object({
            login: Joi.string().email().required(),
            password: Joi.string()
                .min(5)
                .max(20)
                .pattern(/[a-zA-Z0-9]/)
                .required()
        })
    },
    VALIDATION_OPTIONS
);

export const validateRefreshTokenRequest = celebrate({
    [Segments.BODY]: Joi.object({
        refresh_token: Joi.string().required()
    })
});
