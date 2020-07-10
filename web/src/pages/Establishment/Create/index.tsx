import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiUser, FiMap, FiHome, FiPhone, FiRefreshCcw } from 'react-icons/fi';
import { Container, Content, Form } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

interface CreateFormData {
  name: string;
  cnpj: number;
  address: string;
  phone: string;
  quantity_motorcycles: number;
  quantity_cars: number;
}

const CreateEstablish: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      formRef.current?.setErrors([]);
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cnpj: Yup.number().required('CNPJ obrigatório'),
          address: Yup.string().required('Endereço obrigatório'),
          phone: Yup.number().required('Telefone obrigatório'),
          quantity_motorcycles: Yup.number().required(
            'Quantidade de motos obrigatória',
          ),
          quantity_cars: Yup.number().required(
            'Quantidade de carros obrigatória',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/establishments', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoBarber',
        });

        history.push('/establishments');
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
          <h1>Cadastro de estabelecimento</h1>

          <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
          <Input type="text" name="cnpj" icon={FiHome} placeholder="CNPJ" />
          <Input name="address" icon={FiMap} placeholder="Endereço" />
          <Input name="phone" icon={FiPhone} placeholder="Telefone" />
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

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateEstablish;
