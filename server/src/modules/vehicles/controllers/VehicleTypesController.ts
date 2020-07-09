import { container } from 'tsyringe';

import { Request, Response } from 'express';
import ListAllVehicleTypesService from '../services/ListAllVehicleTypesService';

class VehiclesController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAllVehicleTypesService = container.resolve(
      ListAllVehicleTypesService,
    );

    const vehicles = await listAllVehicleTypesService.execute();

    return response.json(vehicles);
  }
}

export default VehiclesController;
