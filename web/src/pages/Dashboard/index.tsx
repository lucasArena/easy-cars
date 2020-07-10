import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { format, parseISO, getHours } from 'date-fns';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Header from '../../components/Header';

import {
  Container,
  Content,
  TransactionList,
  TransactionResults,
  TransactionItem,
  Form,
  DateFilter,
  TotalTransactions,
  TransactionsPerHour,
} from './styles';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import Button from '../../components/Button';
import InputMask from '../../components/InputMask';
import getValidationErrors from '../../utils/getValidationErrors';

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

interface PropsDateFilterForm {
  selectedDate: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedDate] = useState(new Date());

  const formFilterRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const eachHour = Array.from({ length: 24 }, (_, index) => index + 1);

  const handleSubmit = useCallback(
    async (formDataFilter: PropsDateFilterForm) => {
      formFilterRef.current?.setErrors([]);
      try {
        const schema = Yup.object().shape({
          selectedDate: Yup.string()
            .matches(
              /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/,
              'Data no formato inválido (DD/MM/YYYY)',
            )
            .required('Data obrigatória'),
        });

        await schema.validate(formDataFilter, {
          abortEarly: false,
        });

        const dateParts = formDataFilter.selectedDate.split('/');
        const convertedDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]),
          Number(dateParts[0]),
        );

        const response = await api.get('/transactions', {
          params: {
            day: convertedDate.getDate(),
            month: convertedDate.getMonth(),
            year: convertedDate.getFullYear(),
          },
        });

        setTransactions(response.data);
      } catch (err) {
        const errors = getValidationErrors(err);
        formFilterRef.current?.setErrors(errors);

        addToast({
          title: 'Erro',
          description:
            'Ocorreu um erro para filtrar por data, tente novamente!',
          type: 'error',
        });
      }
    },
    [addToast],
  );

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

  const formattedDate = useMemo(() => {
    return format(selectedDate, 'dd/MM/yyyy');
  }, [selectedDate]);

  useEffect(() => {
    async function handleLoadTransactions(): Promise<void> {
      try {
        const response = await api.get('/transactions', {
          params: {
            day: selectedDate.getDate(),
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
          },
        });

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
  }, [addToast, selectedDate]);

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
          <DateFilter>
            <h3>Filtrar por data</h3>

            <Form
              onSubmit={handleSubmit}
              ref={formFilterRef}
              initialData={{ selectedDate: formattedDate }}
            >
              <InputMask
                name="selectedDate"
                icon={FiCalendar}
                type="calendar"
                mask="99/99/9999"
              />
              <Button type="submit">Filtrar por data</Button>
            </Form>
          </DateFilter>
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
