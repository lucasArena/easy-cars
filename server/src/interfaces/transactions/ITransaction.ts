export default interface ITransaction {
  id?: string;
  establishment_id: string;
  vehicle_id: string;
  type: 'in' | 'out';
}
