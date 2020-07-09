import Vehicle from './Vehicle';
import ICreateVehicle from './ICreateVehicle';

export default interface IVehicleRepository {
  index(): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | undefined>;
  create(data: ICreateVehicle): Promise<Vehicle>;
  save(dataUser: Vehicle): Promise<Vehicle>;
  delete(id: string): Promise<Vehicle | undefined>;
}
