export function maskCEP(cep: string): string {
  cep = cep.replace(/\D/g, '');
  if (cep.length > 5) {
    cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
  }
  return cep;
}

export function mascaraCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length > 3) {
    cpf = cpf.slice(0, 3) + '.' + cpf.slice(3);
  }
  if (cpf.length > 7) {
    cpf = cpf.slice(0, 7) + '.' + cpf.slice(7);
  }
  if (cpf.length > 11) {
    cpf = cpf.slice(0, 11) + '-' + cpf.slice(11, 13);
  }
  return cpf.slice(0, 14);
}

export function mascaraTelefone(telefone: string): string {
  telefone = telefone.replace(/\D/g, '');
  if (telefone.length > 2) {
    telefone = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2);
  }
  if (telefone.length > 10) {
    telefone = telefone.slice(0, 10) + '-' + telefone.slice(10, 15);
  }
  return telefone.slice(0, 15);
}
