import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { FiTrash, FiEdit } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import Header from '../../components/Header';
import Button from '../../components/Button';

import {
  Container,
  Content,
  TransactionList,
  TransactionResults,
  Actions,
  TransactionItem,
} from './styles';
import api from '../../services/api';

interface EstablishmentProps {
  id: string;
  name: string;
  phone: string;
}

const Establishment: React.FC = () => {
  const [establishments, setEstablishments] = useState<EstablishmentProps[]>(
    [],
  );

  const { addToast } = useToast();

  const establishmentLength = useMemo(() => {
    return establishments.length;
  }, [establishments]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/establishments/${id}`);

        setEstablishments((oldEstablishments) => {
          return oldEstablishments.filter(
            (oldEstablishment) => oldEstablishment.id !== id,
          );
        });

        addToast({
          type: 'success',
          title: 'Registro deletado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao tentar deletar registro',
          description: 'Ocorreu um erro ao fazer o delete, tente novamente',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    async function handleLoadEstablishment(): Promise<void> {
      try {
        const response = await api.get('/establishments');
        setEstablishments(response.data);
      } catch (err) {
        addToast({
          title: 'Erro',
          description: 'Ocorreu um erro para carregar as entradas/saídas',
          type: 'error',
        });
      }
    }
    handleLoadEstablishment();
  }, [addToast]);

  return (
    <Container>
      <Header />
      <Content>
        <TransactionList>
          <Link to="/establishments/create">
            <Button>Criar novo estabelecimento</Button>
          </Link>

          <h1>Controle de estabelecimentos</h1>

          <TransactionItem>
            <strong>Listagem</strong>
            {establishments.map((establishment) => (
              <div key={establishment.id}>
                <strong>{`${establishment.name} - ${establishment.phone}`}</strong>
                <Actions>
                  <button type="button">
                    <Link to={`/establishments/${establishment.id}`}>
                      <FiEdit color="#ffffff" />
                    </Link>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(establishment.id)}
                  >
                    <FiTrash color="#ffffff" />
                  </button>
                </Actions>
              </div>
            ))}
          </TransactionItem>
        </TransactionList>

        <TransactionResults>
          <div>
            <h3>Total</h3>
            <p>
              Estabelecimentos:
              <span>{establishmentLength}</span>
            </p>
          </div>
        </TransactionResults>
      </Content>
    </Container>
  );
};

export default Establishment;
