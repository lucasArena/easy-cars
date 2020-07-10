import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useHistory, withRouter, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiUser, FiMap, FiPhone, FiRefreshCcw, FiHome } from 'react-icons/fi';
import { Container, Content, Form } from './styles';

import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

interface CreateFormData {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  quantity_motorcycles: number;
  quantity_cars: number;
}

const UpdateEstablishment: React.FC = () => {
  const [establishment, setEstablishment] = useState<CreateFormData>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      formRef.current?.setErrors([]);
      try {
        const formattedData = {
          name: data.name,
          address: data.address,
          phone: data.phone,
          quantity_motorcycles: data.quantity_motorcycles,
          quantity_cars: data.quantity_cars,
        };

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          address: Yup.string().required('Endereço obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          quantity_motorcycles: Yup.number().required(
            'Quantidade de motos obrigatória',
          ),
          quantity_cars: Yup.number().required(
            'Quantidade de carros obrigatória',
          ),
        });

        await schema.validate(formattedData, {
          abortEarly: false,
        });

        await api.put(`/establishments/${id}`, formattedData);

        addToast({
          type: 'success',
          title: 'Atualização realizada com sucesso',
        });

        history.push('/establishments');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao fazer a atualização, tente novamente',
        });
      }
    },
    [addToast, history, id],
  );

  useEffect(() => {
    async function handleLoadEstablishment(): Promise<void> {
      try {
        const response = await api.get(`establishments/${id}`);

        setEstablishment(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Ocorreu um erro ao carregar os dados, tente novamente!',
        });
      }
    }
    handleLoadEstablishment();
  }, [addToast, id]);

  return (
    <Container>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef} initialData={establishment}>
          <h1>Atualização de estabelecimento</h1>
          <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
          <InputMask
            type="text"
            icon={FiHome}
            name="cnpj"
            placeholder="CNPJ"
            mask="99.999.999/9999-99"
            disabled
          />

          <Input name="address" icon={FiMap} placeholder="Endereço" />
          <InputMask
            name="phone"
            icon={FiPhone}
            placeholder="Telefone"
            mask="99 99999-9999"
          />
          <Input
            type="number"
            name="quantity_motorcycles"
            icon={FiRefreshCcw}
            placeholder="Quantidade de motos"
          />
          <Input
            type="number"
            name="quantity_cars"
            icon={FiRefreshCcw}
            placeholder="Quantidade de carros"
          />
          <Button type="submit">Atualizar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default withRouter(UpdateEstablishment);
