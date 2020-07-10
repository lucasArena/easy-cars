import { container } from 'tsyringe';

import { Request, Response } from 'express';
import CreateEstablishmentService from '../services/CreateEstablishmentService';
import ListOneEstablishmentService from '../services/ListOneEstablishmentService';
import ListAllEstablishmentsService from '../services/ListAllEstablishmentsService';
import UpdateEstablishmentsService from '../services/UpdateEstablishmentsService';
import DeleteEstablishmentsService from '../services/DeleteEstablishmentsService';

class EstablishmentsController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAllEstablishmentsService = container.resolve(
      ListAllEstablishmentsService,
    );

    const establishments = await listAllEstablishmentsService.execute();

    return response.json(establishments);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listOneEstablishmentService = container.resolve(
      ListOneEstablishmentService,
    );

    const establishment = await listOneEstablishmentService.execute({
      id: String(id),
    });

    return response.json(establishment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cnpj,
      address,
      phone,
      quantity_motorcycles,
      quantity_cars,
    } = request.body;
    const createEstablishmentService = container.resolve(
      CreateEstablishmentService,
    );

    const establishments = await createEstablishmentService.execute({
      name,
      cnpj,
      address,
      phone,
      quantity_motorcycles,
      quantity_cars,
    });

    return response.json(establishments);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      address,
      phone,
      quantity_motorcycles,
      quantity_cars,
    } = request.body;

    const updateEstablishmentsService = container.resolve(
      UpdateEstablishmentsService,
    );

    const establishments = await updateEstablishmentsService.execute({
      id,
      name,
      address,
      phone,
      quantity_motorcycles,
      quantity_cars,
    });

    return response.json(establishments);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEstablishmentsService = container.resolve(
      DeleteEstablishmentsService,
    );

    const establishment = await deleteEstablishmentsService.execute({ id });

    return response.json(establishment);
  }
}

export default EstablishmentsController;
