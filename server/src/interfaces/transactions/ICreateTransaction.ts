export default interface ICreateTransaction {
  establishment_id: string;
  vehicle_id: string;
  type: 'in' | 'out';
}
