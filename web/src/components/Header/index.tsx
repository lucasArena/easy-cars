import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { Container, HeaderContent, Profile, Menu } from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <Link to="/dashboard">
          <img src={logoImg} alt="Logo do LucasTeste" />
        </Link>
        <Profile>
          <div>
            <span>Bem vindo</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>

        <Menu>
          <Link to="/establishments">Estabelecimentos</Link>
          <Link to="vehicles">Veículos</Link>
        </Menu>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;
