import { Router } from 'express';

import userRoutes from '@modules/users/routes/users.routes';
import sessionRoutes from '@modules/users/routes/sessions.routes';
import establishmentRoutes from '@modules/establishments/routes/establishments.routes';
import vehiclesRoutes from '@modules/vehicles/routes/vehicles.routes';
import transactionsRoutes from '@modules/transactions/routes/transactions.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/establishments', establishmentRoutes);
routes.use('/vehicles', vehiclesRoutes);
routes.use('/transactions', transactionsRoutes);

export default routes;
