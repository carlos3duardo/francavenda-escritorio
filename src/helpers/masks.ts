export function maskCpf(cpf: string | null) {
  if (!cpf) return '';

  if (cpf.length !== 11) {
    return cpf;
  }

  return (
    cpf.substring(0, 3) +
    '.' +
    cpf.substring(3, 6) +
    '.' +
    cpf.substring(6, 9) +
    '-' +
    cpf.substring(9, 11)
  );
}

export function maskCnpj(cnpj: string | null) {
  if (!cnpj) return '';

  if (cnpj.length !== 14) {
    return cnpj;
  }

  return (
    cnpj.substring(0, 2) +
    '.' +
    cnpj.substring(2, 5) +
    '.' +
    cnpj.substring(5, 8) +
    '/' +
    cnpj.substring(8, 12) +
    '-' +
    cnpj.substring(12, 14)
  );
}

export function maskCep(cep: string | null) {
  if (!cep) return '';

  if (cep.length !== 8) {
    return cep;
  }

  return (
    cep.substring(0, 2) + '.' + cep.substring(2, 5) + '-' + cep.substring(5, 8)
  );
}

export function maskCartaoCredito(numero: string | null) {
  if (!numero) return '';

  if (numero.length === 16) {
    return (
      numero.substring(0, 4) +
      ' ' +
      numero.substring(4, 8) +
      ' ' +
      numero.substring(8, 12) +
      ' ' +
      numero.substring(12, 16)
    );
  }

  return numero;
}

export function maskPrimeiroPagamento(periodo: string | null) {
  if (!periodo) return '';

  const [ano, mes] = periodo.split('-');

  return `${mes}/${ano}`;
}

export function maskTelefone(numero: string | null) {
  if (!numero) return '';

  if (numero.length === 10) {
    return (
      '(' +
      numero.substring(0, 2) +
      ') ' +
      numero.substring(2, 6) +
      '-' +
      numero.substring(6, 10)
    );
  }

  if (numero.length === 11) {
    return (
      '(' +
      numero.substring(0, 2) +
      ') ' +
      numero.substring(2, 7) +
      '-' +
      numero.substring(7, 11)
    );
  }

  return numero;
}
