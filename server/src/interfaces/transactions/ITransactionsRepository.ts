import ICreateTransaction from './ICreateTransaction';
import ITransaction from './ITransaction';
import IIndexTransaction from './IIndexTransaction';

export default interface ITransactionsRepository {
  index(date: IIndexTransaction): Promise<ITransaction[]>;
  create(transactionData: ICreateTransaction): Promise<ITransaction>;
}
