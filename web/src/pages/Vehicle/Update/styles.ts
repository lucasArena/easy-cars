import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const Form = styled(UnformForm)`
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
`;
