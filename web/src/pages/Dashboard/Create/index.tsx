import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiBriefcase, FiTruck, FiLogIn } from 'react-icons/fi';
import { Container, Content, Form } from './styles';

import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

interface CreateFormData {
  brand: string;
  model: string;
  color: string;
  plate: string;
  type: string;
}

interface EstablishmentProps {
  id: string;
  name: string;
  phone: string;
}

interface VehicleProps {
  id: string;
  brand: string;
  model: string;
  plate: string;
}

const TransactionCreate: React.FC = () => {
  const [establishments, setEstablishments] = useState<EstablishmentProps[]>(
    [],
  );
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      formRef.current?.setErrors([]);
      try {
        const schema = Yup.object().shape({
          establishment_id: Yup.string().required(
            'Estabelicimento obrigatório',
          ),
          vehicle_id: Yup.string().required('Veículo obrigatório'),
          type: Yup.string().required('Tipo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/transactions', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Sua movimentação foi cadastrado com sucesso',
        });

        history.push('/dashboard');
      } catch (err) {
        console.log(err);

        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  const formattedEstablishments = useMemo(() => {
    return establishments.map((establishment) => ({
      label: establishment.name,
      value: establishment.id,
    }));
  }, [establishments]);

  const formattedVehicles = useMemo(() => {
    return vehicles.map((vehicle) => ({
      label: vehicle.plate,
      value: vehicle.id,
    }));
  }, [vehicles]);

  useEffect(() => {
    async function handleLoadEstablishments(): Promise<void> {
      try {
        const response = await api.get('/establishments');

        setEstablishments(response.data);
      } catch (error) {
        addToast({
          title: 'Erro',
          description: 'Ocorreu um erro para carregar as estabelecimentos',
          type: 'error',
        });
      }
    }

    async function handleLoadVehicles(): Promise<void> {
      try {
        const response = await api.get('/vehicles');

        setVehicles(response.data);
      } catch (error) {
        addToast({
          title: 'Erro',
          description: 'Ocorreu um erro para carregar as veículos',
          type: 'error',
        });
      }
    }

    handleLoadEstablishments();
    handleLoadVehicles();
  }, [addToast]);

  return (
    <Container>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Cadastro de nova entrada/saída</h1>

          <Select
            type="text"
            name="establishment_id"
            icon={FiBriefcase}
            placeholder="Estabelecimento"
            options={formattedEstablishments}
          />
          <Select
            type="text"
            name="vehicle_id"
            icon={FiTruck}
            placeholder="Veículo"
            options={formattedVehicles}
          />
          <Select
            name="type"
            icon={FiLogIn}
            placeholder="Tipo"
            options={[
              { label: 'Entrada', value: 'in' },
              { label: 'Saída', value: 'out' },
            ]}
          />

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default TransactionCreate;
