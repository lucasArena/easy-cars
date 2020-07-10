import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const TransactionList = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: ${(props) => props.theme.colors.secundary};
  }
`;

export const TransactionItem = styled.div`
  margin-top: 30px;

  div {
    background: ${(props) => props.theme.colors.placeholder};
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 25px;
    position: relative;
    height: 80px;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: ${(props) => props.theme.colors.secundary};
    }

    p {
      display: flex;
      align-items: center;
      margin: 0;

      svg {
        margin-right: 5px;
      }
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colors.text};
    }
  }
`;

export const TransactionResults = styled.aside`
  width: 380px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    background: ${(props) => props.theme.colors.placeholder};
    padding: 20px;
    border-radius: 8px;

    h3 {
      text-align: left;
    }
  }

  div + div {
    margin-top: 20px;
  }
`;

export const TotalTransactions = styled.div`
  div {
    p {
      font-size: 24px;
      span {
        margin-left: 5px;
        color: ${(props) => props.theme.colors.secundary};
      }
    }

    p + p {
      margin-top: 10px;
    }
  }
`;

export const TransactionsPerHour = styled.div`
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      font-size: 20px;
      span {
        margin-left: 5px;
        color: ${(props) => props.theme.colors.secundary};
      }

      & + p {
        margin-left: 5px;
      }
    }
  }
`;
