import { container } from 'tsyringe';

import IUserRepository from '@interfaces/users/IUserRepository';
import UserRepository from '@modules/users/repositories/typeorm/UserRepository';

import IEstablishmentRepository from '@interfaces/establishments/IEstablishmentRepository';
import EstablishmentRepository from '@modules/establishments/repositories/typeorm/EstabishmentRepository';

import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';
import VehiclesRepository from '@modules/vehicles/repositories/typeorm/VehiclesRepository';

import IVehicleTypesRepository from '@interfaces/vehicleTypes/IVehicleTypesRepository';
import VehicleTypesRepository from '@modules/vehicles/repositories/typeorm/VehicleTypesRepository';

import ITransactionsRepository from '@interfaces/transactions/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/repositories/typeorm/TransactionsRepository';

import '@modules/users/providers';
import '@modules/establishments/providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IEstablishmentRepository>(
  'EstablishmentRepository',
  EstablishmentRepository,
);

container.registerSingleton<IVehiclesRepository>(
  'VehiclesRepository',
  VehiclesRepository,
);

container.registerSingleton<IVehicleTypesRepository>(
  'VehicleTypesRepository',
  VehicleTypesRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
