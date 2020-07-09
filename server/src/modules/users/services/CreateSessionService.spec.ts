import 'reflect-metadata';

import FakeUserRepository from '@modules/users/mock/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/mock/FakehashProvider';
import FakeJwtTokenProvider from '@modules/users/providers/TokenProvider/fakes/FakeJwtTokenProvider';
import AppError from '@shared/errors/AppError';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

let createSessionService: CreateSessionService;
let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeJwtTokenProvider: FakeJwtTokenProvider;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeJwtTokenProvider = new FakeJwtTokenProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
      fakeJwtTokenProvider,
    );
  });

  it('should be able sign in', async () => {
    await createUserService.execute({
      name: 'Lucas Arena',
      email: 'lucasarenasantos@gmail.com',
      password: '12356',
    });

    const user = await createSessionService.execute({
      email: 'lucasarenasantos@gmail.com',
      password: '12356',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able with an wrong e-mail', async () => {
    await expect(
      createSessionService.execute({
        email: 'lucasarenasantos@gmail.com',
        password: '12356',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able with an wrong password', async () => {
    await createUserService.execute({
      name: 'Lucas Arena',
      email: 'lucasarenasantos@gmail.com',
      password: '12356',
    });

    await expect(
      createSessionService.execute({
        email: 'lucasarenasantos@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
