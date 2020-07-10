import { container } from 'tsyringe';

import { Request, Response } from 'express';
import CreateVehiclesService from '../services/CreateVehiclesService';
import UpdateVehiclesService from '../services/UpdateVehiclesService';
import ListOneVehicleService from '../services/ListOneVehicleService';
import ListAllVehiclesService from '../services/ListAllVehiclesService';
import DeleteVehiclesService from '../services/DeleteVehiclesService';

class VehiclesController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAllVehiclesService = container.resolve(ListAllVehiclesService);

    const vehicles = await listAllVehiclesService.execute();

    return response.json(vehicles);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listOneVehicleService = container.resolve(ListOneVehicleService);

    const vehicle = await listOneVehicleService.execute({ id: String(id) });

    return response.json(vehicle);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { brand, model, color, plate, type_id } = request.body;
    const createVehiclesService = container.resolve(CreateVehiclesService);

    const vehicle = await createVehiclesService.execute({
      brand,
      model,
      color,
      plate,
      type_id,
    });

    return response.json(vehicle);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { brand, model, color, plate, type_id } = request.body;

    const updateVehiclesService = container.resolve(UpdateVehiclesService);

    const establishments = await updateVehiclesService.execute({
      id,
      brand,
      model,
      color,
      plate,
      type_id,
    });

    return response.json(establishments);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteVehiclesService = container.resolve(DeleteVehiclesService);

    const establishment = await deleteVehiclesService.execute({ id });

    return response.json(establishment);
  }
}

export default VehiclesController;
