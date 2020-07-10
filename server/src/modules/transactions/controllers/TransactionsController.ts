import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionsService from '../services/CreateTransactionsService';
import ListTransactionsByDayService from '../services/ListTransactionsByDayService';

class TransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;

    const listTransactionsByDayService = container.resolve(
      ListTransactionsByDayService,
    );

    const transactions = await listTransactionsByDayService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(transactions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { establishment_id, vehicle_id, type } = request.body;

    const createTransactionsService = container.resolve(
      CreateTransactionsService,
    );

    const transaction = await createTransactionsService.execute({
      establishment_id,
      vehicle_id,
      type,
    });

    return response.json(transaction);
  }
}

export default TransactionsController;
