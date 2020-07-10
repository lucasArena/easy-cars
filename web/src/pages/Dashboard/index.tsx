import React, { useEffect, useState, useMemo } from 'react';
import { format, parseISO, getHours } from 'date-fns';

import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import {
  Container,
  Content,
  TransactionList,
  TransactionResults,
  TransactionItem,
  TotalTransactions,
  TransactionsPerHour,
} from './styles';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import Button from '../../components/Button';

interface Transaction {
  id: string;
  vehicle: {
    brand: string;
    model: string;
    plate: string;
  };
  type: string;
  created_at: string;
  formattedHour?: string;
  formattedType?: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { addToast } = useToast();

  const eachHour = Array.from({ length: 24 }, (_, index) => index + 1);

  const checkInQuantity = useMemo(() => {
    return transactions.filter(({ type }) => type === 'in').length;
  }, [transactions]);

  const checkOutQuantity = useMemo(() => {
    return transactions.filter(({ type }) => type === 'out').length;
  }, [transactions]);

  const transactionsPerHour = useMemo(() => {
    return eachHour.map((hour) => {
      const checkInPerHour = transactions.filter((transaction) => {
        return (
          getHours(parseISO(transaction.created_at)) === hour &&
          transaction.type === 'in'
        );
      });

      const checkOutInPerHour = transactions.filter(
        (transaction) =>
          getHours(parseISO(transaction.created_at)) === hour &&
          transaction.type === 'out',
      );

      const newHour = new Date();
      newHour.setHours(hour);
      newHour.setMinutes(0);
      newHour.setSeconds(0);
      return {
        hour: format(newHour, 'HH:mm'),
        in: checkInPerHour.length,
        out: checkOutInPerHour.length,
      };
    });
  }, [transactions, eachHour]);

  const transactionsFormatted = useMemo(() => {
    return transactions.map((transaction) => ({
      ...transaction,
      formattedHour: format(parseISO(transaction.created_at), 'HH:mm'),
      formattedType: transaction.type === 'in' ? 'Entrada' : 'Saída',
    }));
  }, [transactions]);

  useEffect(() => {
    async function handleLoadTransactions(): Promise<void> {
      try {
        const response = await api.get('/transactions');

        setTransactions(response.data);
      } catch (error) {
        addToast({
          title: 'Erro',
          description: 'Ocorreu um erro para carregar as entradas/saídas',
          type: 'error',
        });
      }
    }

    handleLoadTransactions();
  }, [addToast]);

  return (
    <Container>
      <Header />

      <Content>
        <TransactionList>
          <Link to="/transactions/create">
            <Button>Criar nova entrada/saída</Button>
          </Link>
          <h1>Controle de entrada e saída</h1>

          <TransactionItem>
            <strong>Entradas/ Saídas</strong>
            {transactionsFormatted.map(
              ({ id, formattedHour, formattedType, vehicle }) => (
                <div key={id}>
                  <p>
                    <FiClock />
                    <span>{formattedHour}</span>
                  </p>
                  <strong>
                    {`${vehicle.brand} ${vehicle.model} - ${vehicle.plate}`}
                  </strong>
                  <span>{formattedType}</span>
                </div>
              ),
            )}
          </TransactionItem>
        </TransactionList>

        <TransactionResults>
          <TotalTransactions>
            <h3>Total</h3>
            <div>
              <p>
                Entradas:
                <span>{checkInQuantity}</span>
              </p>

              <p>
                Saídas:
                <span>{checkOutQuantity}</span>
              </p>
            </div>
          </TotalTransactions>

          <TransactionsPerHour>
            <h3>Resumo por hora</h3>
            {transactionsPerHour.map((transactionPerHour) => (
              <div key={transactionPerHour.hour}>
                <p>{transactionPerHour.hour}</p>
                <p>
                  Entradas:
                  <span>{transactionPerHour.in}</span>
                </p>

                <p>
                  Saídas:
                  <span>{transactionPerHour.out}</span>
                </p>
              </div>
            ))}
          </TransactionsPerHour>
        </TransactionResults>
      </Content>
    </Container>
  );
};

export default Dashboard;
