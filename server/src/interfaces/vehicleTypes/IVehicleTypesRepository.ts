import IVehicleTypes from './IVehicleTypes';

export default interface IVehicleTypesRepository {
  index(): Promise<IVehicleTypes[]>;
}
