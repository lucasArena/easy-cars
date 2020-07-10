import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 0;
  background: ${(props) => props.theme.colors.background};
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  a {
    > img {
      height: 80px;
    }
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: ${(props) => props.theme.colors.placeholder};
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: ${(props) => props.theme.colors.text};
    }

    strong {
      color: ${(props) => props.theme.colors.secundary};
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  margin-left: 100px;

  a {
    text-decoration: none;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 10px;
    color: ${(props) => props.theme.colors.secundary};
    padding: 10px;
    font-size: 18px;
    transition: 0.4s;

    &:hover {
      color: ${(props) => props.theme.colors.text};
    }

    & + a {
      margin-left: 20px;
    }
  }
`;
