import Joi from 'joi';

const schema = Joi.object({
    id: Joi.number().strip(),

    login: Joi.string().email().required(),

    password: Joi.string().min(5).max(20).pattern(/[a-zA-Z0-9]/).required(),

    age: Joi.number().integer().min(4).max(130).required(),

    isDeleted: Joi.boolean().invalid(true).default(false)
});

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};

export { schema, options };
