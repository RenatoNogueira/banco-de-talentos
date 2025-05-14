import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Experiencia {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  atividades: string;
}

@Component({
  selector: 'app-experiencia-profissional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experiencia-profissional.component.html',
  styleUrls: ['./experiencia-profissional.component.css']
})
export class ExperienciaProfissionalComponent  {
  experiencias: Experiencia[] = [
    {
      empresa: '',
      cargo: '',
      inicio: '',
      fim: '',
      atividades: ''
    }
  ];


  adicionarExperiencia(): void {
    this.experiencias.push({
      empresa: '',
      cargo: '',
      inicio: '',
      fim: '',
      atividades: ''
    });
  }

  removerExperiencia(index: number): void {
    if (this.experiencias.length > 1) {
      this.experiencias.splice(index, 1);
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

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

