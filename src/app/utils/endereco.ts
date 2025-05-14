export function limparCamposEndereco(): void {
  (document.getElementById('rua') as HTMLInputElement).value = '';
  (document.getElementById('bairro') as HTMLInputElement).value = '';
  (document.getElementById('cidade') as HTMLInputElement).value = '';
  (document.getElementById('estado') as HTMLInputElement).value = '';
}

export async function buscarCEP(cep: string): Promise<any> {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    throw new Error('CEP inválido');
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data = await response.json();

  if (data.erro) {
    throw new Error('CEP não encontrado');
  }

  return data; // <-- Retorna o endereço aqui
}

