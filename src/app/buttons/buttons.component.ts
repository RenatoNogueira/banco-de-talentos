import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validateField, validateRadioGroup } from '../utils/form-validation';

@Component({
  selector: 'app-buttons',
  imports: [],
  standalone: true,
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent implements AfterViewInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    // Exemplo de estrutura inicial do formulário
    this.formulario = this.fb.group({
      nomeCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required]
      // Adicione outros campos conforme necessário
    });
  }

  ngAfterViewInit(): void {
    // qualquer lógica após a view ser inicializada
  }

  validarFormulario(): void {
    const campos = document.querySelectorAll('input, select');
    campos.forEach(campo =>
      validateField(campo as HTMLInputElement | HTMLSelectElement)
    );
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    // Executa validações personalizadas
    if (typeof validateField === 'function' && typeof validateRadioGroup === 'function') {
      this.validarFormulario();
      validateRadioGroup('formulario');
    }

    // Processamento do formulário
    console.log(this.formulario.value);
  }
}

