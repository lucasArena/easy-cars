import { container } from 'tsyringe';

import IUserRepository from '@interfaces/users/IUserRepository';
import UserRepository from '@modules/users/repositories/UserRepository';

import IEstablishmentRepository from '@interfaces/establishments/IEstablishmentRepository';
import EstablishmentRepository from '@modules/establishments/repositories/typeorm/EstabishmentRepository';

import '@modules/users/providers';
import '@modules/establishments/providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IEstablishmentRepository>(
  'EstablishmentRepository',
  EstablishmentRepository,
);
