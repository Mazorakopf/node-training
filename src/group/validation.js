import Joi from 'joi';

const schema = Joi.object({
    id: Joi.number().strip(),

    name: Joi.string().required(),

    permissions: Joi.array().items(
        Joi.string().valid('READ'),
        Joi.string().valid('WRITE'),
        Joi.string().valid('DELETE'),
        Joi.string().valid('SHARE'),
        Joi.string().valid('UPLOAD_FILES')
    )
});

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};

export { schema, options };
