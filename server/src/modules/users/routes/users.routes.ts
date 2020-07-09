import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const router = Router();

const usersController = new UsersController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default router;
