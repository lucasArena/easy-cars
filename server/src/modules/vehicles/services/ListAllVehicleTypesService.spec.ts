import 'reflect-metadata';

import FakeVehicleTypesRepository from '../mock/FakeVehicleTypesRepository';
import ListAllVehicleTypesService from './ListAllVehicleTypesService';

let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let listAllVehicleTypesService: ListAllVehicleTypesService;

describe('ListAllVehicleTypesService', () => {
  beforeEach(() => {
    fakeVehicleTypesRepository = new FakeVehicleTypesRepository();
    listAllVehicleTypesService = new ListAllVehicleTypesService(
      fakeVehicleTypesRepository,
    );
  });

  it('should be able list all vehicles types', async () => {
    const vehicleTypes = await listAllVehicleTypesService.execute();

    expect(vehicleTypes).toEqual([{ name: 'Carro' }, { name: 'Moto' }]);
  });
});
