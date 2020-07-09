import 'reflect-metadata';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUserRepository from '@modules/users/mock/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/mock/FakehashProvider';
import AppError from '@shared/errors/AppError';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to add a new user', async () => {
    const user = await createUserService.execute({
      name: 'Lucas Arena',
      email: 'lucasarenasantos@gmail.com',
      password: '12356',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to add a new user with a email that already exists', async () => {
    await createUserService.execute({
      name: 'Lucas Arena',
      email: 'lucasarenasantos@gmail.com',
      password: '12356',
    });

    expect(
      createUserService.execute({
        name: 'Lucas Arena',
        email: 'lucasarenasantos@gmail.com',
        password: '12356',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
