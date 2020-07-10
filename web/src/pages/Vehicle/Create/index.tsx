import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiBriefcase, FiPenTool, FiSquare, FiTruck } from 'react-icons/fi';
import { Container, Content, Form } from './styles';

import Input from '../../../components/Input';
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

const CreateVehicle: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      formRef.current?.setErrors([]);
      try {
        const schema = Yup.object().shape({
          brand: Yup.string().required('Marca obrigatório'),
          model: Yup.string().required('Modelo obrigatório'),
          color: Yup.string().required('Cor obrigatório'),
          plate: Yup.string().required('Placa obrigatório'),
          type_id: Yup.string().required('Tipo obrigatóro'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/vehicles', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Seu veículo foi cadastrado com sucesso',
        });

        history.push('/vehicles');
      } catch (err) {
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

  return (
    <Container>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Cadastro de veículos</h1>

          <Input
            type="text"
            name="brand"
            icon={FiBriefcase}
            placeholder="Marca"
          />
          <Input
            type="text"
            name="model"
            icon={FiBriefcase}
            placeholder="Modelo"
          />
          <Input name="color" icon={FiPenTool} placeholder="Cor" />
          <Input name="plate" icon={FiSquare} placeholder="Placa" />
          <Input name="type_id" icon={FiTruck} placeholder="Tipo" />

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateVehicle;
