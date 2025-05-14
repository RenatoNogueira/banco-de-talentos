import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { maskCEP, mascaraCPF, mascaraTelefone } from '../utils/masks';
import { buscarCEP } from '../utils/endereco';

@Component({
  selector: 'app-dados-pessoais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dados-pessoais.component.html',
})
export class DadosPessoaisComponent implements OnInit {

  // SIMULAÇÃO DE JSON
  formulario!: FormGroup;

  dadosJson = {
    nomeCompleto: "Maria Clara de Souza",
    dataNascimento: "1990-05-10",
    genero: "Feminino",
    estadoCivil: "Solteiro(a)",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    nacionalidade: "Brasileira",
    cep: "01001000",
    rua: "Praça da Sé",
    bairro: "Sé",
    cidade: "São Paulo",
    estado: "SP",
    emailPessoal: "maria.clara@gmail.com",
    emailInstitucional: "mclara@instituicao.edu.br",
    telefone: "(11) 98765-4321",
    dataAdmissao: "2022-08-01",
    escolaridade: "Pós-graduação",
  };
// FIM JSON
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nomeCompleto: [{ value: '', disabled: true }],
      dataNascimento: [{ value: '', disabled: true }],
      genero: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      cpf: [{ value: '', disabled: true }],
      rg: [{ value: '', disabled: true }],
      nacionalidade: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      emailPessoal: ['', [Validators.required, Validators.email]],
      emailInstitucional: ['', [Validators.email]],
      telefone: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      escolaridade: ['', Validators.required],
      foto: [null, Validators.required]
    });

    this.formulario.patchValue(this.dadosJson);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formulario.patchValue({ foto: input.files[0] });
    }
  }

  async onCepInput(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const cepComMascara = maskCEP(input.value || '');
    const cepLimpo = cepComMascara.replace('-', '');

    this.formulario.get('cep')?.setValue(cepComMascara, { emitEvent: false });

    if (cepLimpo.length !== 8) {
      return this.limparCamposEndereco();
    }

    try {
      const endereco = await buscarCEP(cepLimpo);
      this.preencherEndereco(endereco);
    } catch (error: any) {
      console.error('Erro buscarCEP:', error);
      alert(error.message || 'Erro ao buscar o CEP.');
      this.limparCamposEndereco();
    }
  }

  private preencherEndereco(endereco: any): void {
    this.formulario.patchValue({
      rua: endereco.logradouro || '',
      bairro: endereco.bairro || '',
      cidade: endereco.localidade || '',
      estado: endereco.uf || ''
    });
  }

  private limparCamposEndereco(): void {
    this.formulario.patchValue({
      rua: '',
      bairro: '',
      cidade: '',
      estado: ''
    });
  }

  onCpfInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let cpf = input.value || '';
    cpf = mascaraCPF(cpf);
    this.formulario.get('cpf')?.setValue(cpf, { emitEvent: false });
  }

  onTelefoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let telefone = input.value || '';
    telefone = mascaraTelefone(telefone);
    this.formulario.get('telefone')?.setValue(telefone, { emitEvent: false });
  }
}
