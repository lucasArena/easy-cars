import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/middlewares/ensuredAutheticated';

import EstablishmentsController from '../controllers/EstablishmentsController';

const router = Router();
const establishmentsController = new EstablishmentsController();

router.use(ensureAuthenticated);

router.get('/', establishmentsController.index);
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cnpj: Joi.number().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      quantity_motorcycles: Joi.number().required(),
      quantity_cars: Joi.number().required(),
    },
  }),
  establishmentsController.create,
);
router.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cnpj: Joi.number().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      quantity_motorcycles: Joi.number().required(),
      quantity_cars: Joi.number().required(),
    },
  }),
  establishmentsController.update,
);
router.delete('/:id', establishmentsController.delete);

export default router;
