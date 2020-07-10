import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiBriefcase, FiPenTool, FiSquare, FiTruck } from 'react-icons/fi';
import { Container, Content, Form } from './styles';

import Select from '../../../components/Select';
import InputMask from '../../../components/InputMask';
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

interface TypesProps {
  id: string;
  name: string;
}

const UpdateVehicle: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id } = useParams();

  const [vehicle, setVehicle] = useState<CreateFormData>({} as CreateFormData);
  const [types, setTypes] = useState<TypesProps[]>([]);

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

        await api.put(`/vehicles/${id}`, data);

        addToast({
          type: 'success',
          title: 'Atualização realizada com sucesso',
        });

        history.push('/vehicles');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao fazer o atualização, tente novamente',
        });
      }
    },
    [addToast, history, id],
  );

  const formattedTypes = useMemo(() => {
    return types.map((type) => ({
      value: type.id,
      label: type.name,
    }));
  }, [types]);

  useEffect(() => {
    async function handleLoadVehicle(): Promise<void> {
      try {
        const response = await api.get(`/vehicles/${id}`);
        setVehicle(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca',
          description:
            'Ocorreu um erro na busca das informações, tente novamente!',
        });
      }
    }

    handleLoadVehicle();
  }, [addToast, id]);

  useEffect(() => {
    async function handleLoadTypes(): Promise<void> {
      try {
        const response = await api.get(`/vehicles/types`);
        setTypes(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao tentar buscar os tipos',
          description: 'Tente novamente mais tarde!',
        });
      }
    }

    handleLoadTypes();
  }, [addToast]);

  return (
    <Container>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef} initialData={vehicle}>
          <h1>Alteração de veículos</h1>
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
          <InputMask
            icon={FiSquare}
            name="plate"
            placeholder="Placa"
            maskChar=""
            mask="aaa-9999"
          />
          <Select
            name="type_id"
            icon={FiTruck}
            placeholder="Tipo"
            options={formattedTypes}
          />
          <Button type="submit">Atualizar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default UpdateVehicle;
