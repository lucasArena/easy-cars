import ITransactionsRepository from '@interfaces/transactions/ITransactionsRepository';
import IIndexTransaction from '@interfaces/transactions/IIndexTransaction';
import ICreateTransaction from '@interfaces/transactions/ICreateTransaction';
import ITransaction from '@interfaces/transactions/ITransaction';
import { uuid } from 'uuidv4';

class FakeTransactionsRepository implements ITransactionsRepository {
  private repository: ITransaction[] = [];

  public async index(_: IIndexTransaction): Promise<ITransaction[]> {
    return this.repository;
  }

  public async create({
    establishment_id,
    type,
    vehicle_id,
  }: ICreateTransaction): Promise<ITransaction> {
    const transaction: ITransaction = {
      id: uuid(),
      establishment_id,
      type,
      vehicle_id,
    };

    this.repository.push(transaction);

    return transaction;
  }
}

export default FakeTransactionsRepository;
