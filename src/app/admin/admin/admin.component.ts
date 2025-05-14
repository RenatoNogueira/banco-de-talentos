import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  buscaControl = new FormControl('');
  sugestoes: any[] = [];
  usuarios: any[] = [];

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/json/usuarios.json').subscribe(data => {
      this.usuarios = data;

      this.buscaControl.valueChanges
  .pipe(debounceTime(300))
  .subscribe((valor) => {
    const termo = (valor || '').toLowerCase().trim();

    if (!termo) {
      this.sugestoes = []; // ou this.usuarios para exibir todos ao apagar
      return;
    }

    this.sugestoes = this.usuarios.filter(user => {
      return (
        user.nome?.toLowerCase().includes(termo) ||
        user.cpf?.includes(termo) ||
        user.disc?.toLowerCase().includes(termo) ||
        this.arrayContem(user.formacao || [], termo) ||
        this.arrayContem(user.experiencia || [], termo) ||
        this.arrayContem(user.habilidades || [], termo) ||
        this.arrayContem(user.comportamentais || [], termo)
      );
    });
  });


    });
  }

  arrayContem(arr: string[], termo: string): boolean {
    return arr.some(item => item.toLowerCase().includes(termo));
  }

  selecionarUsuario(usuario: any): void {
    this.usuarioSelecionado = usuario;
    this.buscaControl.setValue(usuario.nome);
    this.sugestoes = [];
  }

  handleEditClick(): void {
    console.log('Editar usuário');
  }
}
