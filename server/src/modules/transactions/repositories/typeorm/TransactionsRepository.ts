import { getRepository, Repository } from 'typeorm';

import ITransactionsRepository from '@interfaces/transactions/ITransactionsRepository';
import IIndexTransaction from '@interfaces/transactions/IIndexTransaction';
import ICreateTransaction from '@interfaces/transactions/ICreateTransaction';
import ITransaction from '@interfaces/transactions/ITransaction';
import Transaction from './entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  public async index(_: IIndexTransaction): Promise<ITransaction[]> {
    const transactions = await this.repository.find();

    return transactions;
  }

  public async create({
    establishment_id,
    type,
    vehicle_id,
  }: ICreateTransaction): Promise<ITransaction> {
    const transaction = this.repository.create({
      establishment_id,
      vehicle_id,
      type,
    });

    await this.repository.save(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
