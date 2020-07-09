import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '../services/CreateSessionService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserService = container.resolve(CreateSessionService);

    const { user, token } = await createUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export default UsersController;
