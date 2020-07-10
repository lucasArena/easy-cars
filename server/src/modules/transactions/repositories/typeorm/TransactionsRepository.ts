import { getRepository, Repository, Raw } from 'typeorm';

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

  public async index({
    day,
    month,
    year,
  }: IIndexTransaction): Promise<ITransaction[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const transactions = await this.repository.find({
      where: {
        created_at: Raw(
          dateFieldName =>
            `${dateFieldName} BETWEEN '${year}-${parsedMonth}-${parsedDay} 00:00:00' AND '${year}-${parsedMonth}-${parsedDay} 23:59:59'`,
        ),
      },
    });

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
