export default interface ICNPJCPFValidatorProvider {
  cnpjValidate(cnpj: number): boolean;
}
