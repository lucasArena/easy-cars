import React, { useEffect, useState, useMemo, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import Header from '../../components/Header';

import {
  Container,
  Content,
  TransactionList,
  TransactionResults,
  Actions,
  TransactionItem,
} from './styles';
import api from '../../services/api';
import Button from '../../components/Button';

interface VehicleProps {
  id: string;
  brand: string;
  model: string;
  plate: string;
}

const Vehicle: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);

  const { addToast } = useToast();

  const vehiclesLength = useMemo(() => {
    return vehicles.length;
  }, [vehicles]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/vehicles/${id}`);

        setVehicles((oldVehicles) => {
          return oldVehicles.filter((oldVechile) => oldVechile.id !== id);
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
        const response = await api.get('/vehicles');

        setVehicles(response.data);
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
          <Link to="/vehicles/create">
            <Button>Criar novo veículo</Button>
          </Link>

          <h1>Controle de veículo</h1>

          <TransactionItem>
            <strong>Listagem</strong>
            {vehicles.map((vehicle) => (
              <div key={vehicle.id}>
                <strong>{`${vehicle.brand} ${vehicle.model} - ${vehicle.plate}`}</strong>
                <Actions>
                  <button type="button">
                    <Link to={`/vehicles/${vehicle.id}`}>
                      <FiEdit color="#ffffff" />
                    </Link>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(vehicle.id)}
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
              <span>{vehiclesLength}</span>
            </p>
          </div>
        </TransactionResults>
      </Content>
    </Container>
  );
};

export default Vehicle;
