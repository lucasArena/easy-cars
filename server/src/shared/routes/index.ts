import { Router } from 'express';

import userRoutes from '@modules/users/routes/users.routes';
import sessionRoutes from '@modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);

export default routes;
