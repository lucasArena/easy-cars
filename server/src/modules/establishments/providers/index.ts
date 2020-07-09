import { container } from 'tsyringe';

import CNPJCPFValidatorProvider from './CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';
import ICNPJCPFValidatorProvider from './CNPJCPFValidatorProvider/models/ICNPJCPFValidatorProvider';

container.registerSingleton<ICNPJCPFValidatorProvider>(
  'CNPJCPFValidatorProvider',
  CNPJCPFValidatorProvider,
);
