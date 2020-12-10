import { Request, Response, NextFunction } from 'express';
import Validation from './validation';

export default class Validator {

    public static validate(validation: Validation) {
        return (req: Request, res: Response, next: NextFunction) => {
            const result = validation.schema.validate(req.body, validation.options);
            if (!result.error) {
                req.body = result.value;
                return next();
            }
            const message = result.error.details.map((d) => d.message).join(', ');
            return res.status(400).json({ error: 'Bad request', messages: message });
        };
    }
}
