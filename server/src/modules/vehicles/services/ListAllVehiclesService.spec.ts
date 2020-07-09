import 'reflect-metadata';

import FakeVehiclesRepository from '@modules/vehicles/mock/FakeVehiclesRepository';
import CreateVehiclesService from '@modules/vehicles/services/CreateVehiclesService';
import ListAllVehiclesService from '@modules/vehicles/services/ListAllVehiclesService';

let fakeVehiclesRepository: FakeVehiclesRepository;
let listAllVehiclesService: ListAllVehiclesService;
let createVehiclesService: CreateVehiclesService;

describe('ListAllVehiclesService', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();
    createVehiclesService = new CreateVehiclesService(fakeVehiclesRepository);
    listAllVehiclesService = new ListAllVehiclesService(fakeVehiclesRepository);
  });

  it('should be able list all vehicles', async () => {
    const vehicle = await createVehiclesService.execute({
      brand: 'Toyota',
      model: 'Collora',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    const vehicles = await listAllVehiclesService.execute();

    expect(vehicles).toEqual([vehicle]);
  });
});
