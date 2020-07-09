import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/middlewares/ensuredAutheticated';

import VehiclesController from '../controllers/VehiclesController';
import VehicleTypesController from '../controllers/VehicleTypesController';

const router = Router();
const vehiclesController = new VehiclesController();
const vehicleTypesController = new VehicleTypesController();

router.use(ensureAuthenticated);

router.get('/', vehiclesController.index);
router.get('/types', vehicleTypesController.index);
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      brand: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required(),
      plate: Joi.string().required(),
      type_id: Joi.string().required(),
    },
  }),
  vehiclesController.create,
);
router.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      brand: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required(),
      plate: Joi.string().required(),
      type_id: Joi.string().required(),
    },
  }),
  vehiclesController.update,
);
router.delete('/:id', vehiclesController.delete);

export default router;
