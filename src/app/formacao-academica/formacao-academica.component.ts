import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Formacao {
  escolaridade: string;
  curso: string;
  instituicao: string;
  anoConclusao: number | null;
}

@Component({
  selector: 'app-formacao-academica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formacao-academica.component.html',
  styleUrls: ['./formacao-academica.component.css']
})
export class FormacaoAcademicaComponent  {
  formacoes: Formacao[] = [
    {
      escolaridade: '',
      curso: '',
      instituicao: '',
      anoConclusao: null
    }
  ];

  niveisEscolaridade = [
    'Ensino Médio',
    'Ensino Técnico',
    'Superior Incompleto',
    'Superior Completo',
    'Pós-Graduação',
    'Mestrado',
    'Doutorado'
  ];

  adicionarFormacao(): void {
    this.formacoes.push({
      escolaridade: '',
      curso: '',
      instituicao: '',
      anoConclusao: null
    });
  }

  removerFormacao(index: number): void {
    if (this.formacoes.length > 1) {
      this.formacoes.splice(index, 1);
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  // Efeito Ripple
  addRippleEffect(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}
