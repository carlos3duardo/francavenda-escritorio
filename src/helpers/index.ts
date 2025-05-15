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
import { isTokenExpired, isTokenActive } from './jwt';

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

  // jwt
  isTokenExpired,
  isTokenActive,
};
