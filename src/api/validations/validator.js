export default (schema, options) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, options);
        if (!error) {
            req.body = value;
            return next();
        }
        const message = error.details.map((d) => d.message).join(', ');
        return res.status(400).json({ error: 'Bad request', messages: message });
    };
};
