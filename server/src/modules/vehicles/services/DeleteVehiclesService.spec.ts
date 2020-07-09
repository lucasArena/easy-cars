import 'reflect-metadata';

import FakeVehiclesRepository from '@modules/vehicles/mock/FakeVehiclesRepository';
import CreateVehiclesService from '@modules/vehicles/services/CreateVehiclesService';
import DeleteVehiclesService from '@modules/vehicles/services/DeleteVehiclesService';
import AppError from '@shared/errors/AppError';

let fakeVehiclesRepository: FakeVehiclesRepository;
let deleteVehiclesService: DeleteVehiclesService;
let createVehiclesService: CreateVehiclesService;

describe('DeleteVehiclesService', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();
    createVehiclesService = new CreateVehiclesService(fakeVehiclesRepository);
    deleteVehiclesService = new DeleteVehiclesService(fakeVehiclesRepository);
  });

  it('should be able delete a vehicle', async () => {
    const vehicle = await createVehiclesService.execute({
      brand: 'Toyota',
      model: 'Collora',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    await deleteVehiclesService.execute({
      id: String(vehicle.id),
    });

    expect(vehicle).toHaveProperty('id');
  });

  it('should not be able delete a vehicle that does not exists', async () => {
    await expect(
      deleteVehiclesService.execute({
        id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
