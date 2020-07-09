import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import ICNPJCPFValidatorProvider from '../models/ICNPJCPFValidatorProvider';

class CNPJCPFValidatorProvider implements ICNPJCPFValidatorProvider {
  public cnpjValidate(cnpj: number): boolean {
    return cnpjValidator.isValid(String(cnpj));
  }
}

export default CNPJCPFValidatorProvider;
