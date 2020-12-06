import express from 'express';
import * as controller from '../controllers/userController.js';
import { schema, options } from '../validations/userSchema.js';
import validator from '../validations/validator.js';

const userRouter = express.Router();

userRouter
    .route('')
    .get(controller.getAll)
    .post(validator(schema, options), controller.create);

userRouter.param('id', controller.findUser);

userRouter
    .route('/:id')
    .get(controller.getById)
    .put(validator(schema, options), controller.update)
    .delete(controller.remove);

export default userRouter;
