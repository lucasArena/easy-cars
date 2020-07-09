import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/middlewares/ensuredAutheticated';

import TransactionsController from '../controllers/TransactionsController';

const router = Router();

const transactionsController = new TransactionsController();

router.use(ensureAuthenticated);

router.get('/', transactionsController.index);
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      establishment_id: Joi.string().required(),
      vehicle_id: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  transactionsController.create,
);

export default router;
