import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent {
  habilidadesForm: FormGroup;

  habilidades = [
    { nome: 'excel', label: 'Conhecimento em Excel' },
    { nome: 'projetos', label: 'Gestão de Projetos', subtitulo: '(ex.: Trello, Asana, MS Project)' },
    { nome: 'dados', label: 'Análise de Dados', subtitulo: '(Power BI, Google Analytics, etc.)' },
    { nome: 'rh', label: 'Gestão de Recursos Humanos', subtitulo: '(RH, ferramentas de gestão de pessoas)' },
    { nome: 'financeiro', label: 'Planejamento Financeiro e Orçamentário' },
    { nome: 'marketing', label: 'Marketing Digital', subtitulo: '(SEO, Google Ads)' },
    { nome: 'programacao', label: 'Linguagem de Programação' },
    { nome: 'foto', label: 'Fotografia e Edição' },
    { nome: 'design', label: 'Ferramentas de Design', subtitulo: '(Photoshop, Illustrator, CorelDraw)' },
    { nome: 'automacao', label: 'Automação e Processos Industriais' },
    { nome: 'pesquisa', label: 'Pesquisa de Mercado' },
    { nome: 'seguranca', label: 'Saúde e Segurança no Trabalho' }
  ];

  constructor(private fb: FormBuilder) {
    this.habilidadesForm = this.fb.group({});

    this.habilidades.forEach(hab => {
      this.habilidadesForm.addControl(`${hab.nome}_possui`, this.fb.control('', Validators.required));
      this.habilidadesForm.addControl(`${hab.nome}_nivel`, this.fb.control({value: null, disabled: true}));
      this.habilidadesForm.addControl(`${hab.nome}_comentario`, this.fb.control({value: '', disabled: true}));
    });
  }

  onPossuiChange(habilidade: string, possui: string): void {
    const nivelControl = this.habilidadesForm.get(`${habilidade}_nivel`);
    const comentarioControl = this.habilidadesForm.get(`${habilidade}_comentario`);

    if (possui === 'sim') {
      nivelControl?.enable();
      comentarioControl?.enable();
    } else {
      nivelControl?.disable();
      comentarioControl?.disable();
      nivelControl?.reset();
      comentarioControl?.reset();
    }
  }

  onSubmit(): void {
    if (this.habilidadesForm.valid) {
      console.log(this.habilidadesForm.value);
      // Aqui você pode enviar os dados para o servidor
    } else {
      // Marca todos os campos como tocados para mostrar erros
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.habilidadesForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
