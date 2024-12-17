import {
  maskCartaoCredito,
  maskCep,
  maskCnpj,
  maskCpf,
  maskPrimeiroPagamento,
  maskTelefone,
} from './masks';
import { dateBr, dateTimeBr, dateBirthBr, currency } from './locale';
import { capitalize, firstName, initials, shortName } from './string';

export {
  // masks
  maskCartaoCredito,
  maskCep,
  maskCnpj,
  maskCpf,
  maskPrimeiroPagamento,
  maskTelefone,

  // strings
  capitalize,
  firstName,
  initials,
  shortName,

  // locale
  dateBr,
  dateTimeBr,
  dateBirthBr,
  currency,
};
