import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';
import ICreateVehicle from '@interfaces/vehicles/ICreateVehicle';
import Vehicle from '@interfaces/vehicles/Vehicle';
import { uuid } from 'uuidv4';

class FakeVehiclesRepository implements IVehiclesRepository {
  private repository: Vehicle[] = [];

  public async index(): Promise<Vehicle[]> {
    return this.repository;
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    const vehicle = this.repository.find(findVehicle => findVehicle.id === id);

    return vehicle;
  }

  public async create(data: ICreateVehicle): Promise<Vehicle> {
    const vehicle = { id: uuid(), ...data };

    this.repository.push(vehicle);
    return vehicle;
  }

  public async save(vehicle: Vehicle): Promise<Vehicle> {
    const findIndex = this.repository.findIndex(
      findVehicle => findVehicle.id === vehicle.id,
    );

    this.repository[findIndex] = vehicle;
    return vehicle;
  }

  public async delete(id: string): Promise<Vehicle | undefined> {
    const findedIndex = this.repository.findIndex(
      findVehicle => findVehicle.id === id,
    );

    const vehicle = this.repository[findedIndex];

    delete this.repository[findedIndex];

    return vehicle;
  }
}

export default FakeVehiclesRepository;
