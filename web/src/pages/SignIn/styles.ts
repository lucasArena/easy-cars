import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImage from '../../assets/sign-in-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 40px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    > a {
      color: ${({ theme }) => theme.colors.text};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${({ theme }) => shade(0.2, theme.colors.text)};
      }
    }
  }

  > a {
    color: ${({ theme }) => theme.colors.secundary};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${({ theme }) => shade(0.2, theme.colors.secundary)};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Logo = styled.img`
  height: 200px;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImage}) no-repeat center;
  background-size: cover;
`;
