export default (validation) => {
    return (req, res, next) => {
        const { error, value } = validation.schema.validate(req.body, validation.options);
        if (!error) {
            req.body = value;
            return next();
        }
        const message = error.details.map((d) => d.message).join(', ');
        return res.status(400).json({ error: 'Bad request', messages: message });
    };
};
