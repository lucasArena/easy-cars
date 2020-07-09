export default interface ITokenProvider {
  validate(token: string): boolean;
  generate(): string;
}
