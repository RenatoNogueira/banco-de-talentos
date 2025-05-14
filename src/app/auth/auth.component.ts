import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  template: `<a routerLink="/"></a>`
})
export class AuthComponent implements OnInit {

  showPassword: boolean = false;

  formulario!: FormGroup;

  cpf: string = '';
  password: string = '';
  remember: boolean = false;
  cpfError: string = '';
  passwordError: string = '';

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      cpf: [{ value: '', disabled: true }]
    });
  }

  login() {
    this.cpfError = '';
    this.passwordError = '';

    if (!this.cpf) {
      this.cpfError = 'CPF é obrigatório.';
    }

    if (!this.password) {
      this.passwordError = 'Senha é obrigatória.';
    }

    if (this.cpf && this.password) {
      // Perfis de acesso
      const usuarios = [
        { cpf: '000.000.000-00', senha: '123456', rota: '/home' },
        { cpf: '111.111.111-11', senha: '123456', rota: '/admin' },
      ];

      const usuarioEncontrado = usuarios.find(
        user => user.cpf === this.cpf && user.senha === this.password
      );

      if (usuarioEncontrado) {
        this.router.navigate([usuarioEncontrado.rota]);
      } else {
        this.passwordError = 'CPF ou senha inválidos.';
      }
    }
  }

  maskCpf(value: string): string {
    value = value.replace(/\D/g, '').slice(0, 11);
    if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, '$1.$2');
    if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    if (value.length > 9) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    return value;
  }

  onCpfInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cpf = this.maskCpf(input.value);
  }
}
