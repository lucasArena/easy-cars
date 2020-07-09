import 'reflect-metadata';

import FakeVehiclesRepository from '@modules/vehicles/mock/FakeVehiclesRepository';
import CreateVehiclesService from '@modules/vehicles/services/CreateVehiclesService';

let fakeVehicleRepository: FakeVehiclesRepository;
let createVehiclesService: CreateVehiclesService;

describe('CreateEstablishmentsService', () => {
  beforeEach(() => {
    fakeVehicleRepository = new FakeVehiclesRepository();
    createVehiclesService = new CreateVehiclesService(fakeVehicleRepository);
  });

  it('should be able create a new vehicle', async () => {
    const vehicle = await createVehiclesService.execute({
      brand: 'Toyota',
      model: 'Collora',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    expect(vehicle).toHaveProperty('id');
  });
});
