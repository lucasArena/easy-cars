import { inject, injectable } from 'tsyringe';

import ITransactionsRepository from '@interfaces/transactions/ITransactionsRepository';
import ITransaction from '@interfaces/transactions/ITransaction';

interface IRequestProps {
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListTransactionsByDayService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) { }

  public async execute({
    day,
    month,
    year,
  }: IRequestProps): Promise<ITransaction[]> {
    const transactions = await this.transactionsRepository.index({
      day,
      month,
      year,
    });

    return transactions;
  }
}

export default ListTransactionsByDayService;
