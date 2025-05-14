import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layout/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [ NavbarComponent, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usuarioSelecionado: any = {
    nome: 'Selecione um usuário',
    avatar: 'https://img.myloview.com.br/posters/silhueta-de-perfil-de-cabeca-de-avatar-com-imagens-masculinas-de-centro-de-chamada-de-sombra-700-130872660.jpg',
    dadosPessoais: { genero: '-', idade: '-' },
    formacao: [],
    experiencia: [],
    habilidades: [],
    comportamentais: [],
    disc: '',
    curriculumUrl: '#',
  };


  dados = {
    foto: 'assets/foto-perfil.jpg',
    nome: 'Maria Clara de Souza',
    idade: 30,
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    telefone: '(11) 91234-5678',
    email: 'joao@email.com',
    escolaridade: 'Ensino Superior Completo',
    formacoes: [
      {
        escolaridade: 'Graduação',
        curso: 'Educação Física',
        instituicao: 'Universidade XYZ',
        ano: 2020
      },
      {
        escolaridade: 'Pós-graduação',
        curso: 'Treinamento Funcional',
        instituicao: 'Instituto ABC',
        ano: 2022
      }
    ],
    experiencias: [
      {
        empresa: 'Academia Boa Forma',
        cargo: 'Instrutor',
        dataInicio: '2018-01-10',
        dataTermino: '2020-12-15'
      },
      {
        empresa: 'Fit Center',
        cargo: 'Personal Trainer',
        dataInicio: '2021-01-01',
        dataTermino: '2024-03-15'
      }
    ]
  };
}
