import { inject, injectable } from 'tsyringe';

import ITransactionsRepository from '@interfaces/transactions/ITransactionsRepository';
import ITransaction from '@interfaces/transactions/ITransaction';

@injectable()
class ListTransactionsByDayService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) { }

  public async execute(): Promise<ITransaction[]> {
    const transactions = await this.transactionsRepository.index({
      day: 11,
      month: 10,
      year: 2020,
    });

    return transactions;
  }
}

export default ListTransactionsByDayService;
