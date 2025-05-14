import { Component } from '@angular/core';
import { FormacaoAcademicaComponent } from "../formacao-academica/formacao-academica.component";
import { ExperienciaProfissionalComponent } from "../experiencia-profissional/experiencia-profissional.component";
import { HabilidadesComponent } from "../habilidades/habilidades.component";
import { InfoComportamentaisComponent } from "../info-comportamentais/info-comportamentais.component";
import { DiscComponent } from "../disc/disc.component";
import { CurriculumComponent } from "../curriculum/curriculum.component";
import { ButtonsComponent } from "../buttons/buttons.component";
import { DadosPessoaisComponent } from "../dados-pessoais/dados-pessoais.component";
import { NavbarComponent } from "../layout/navbar/navbar.component";



@Component({
  selector: 'app-formulario',
  imports: [FormacaoAcademicaComponent, ExperienciaProfissionalComponent, HabilidadesComponent, InfoComportamentaisComponent, DiscComponent, CurriculumComponent, ButtonsComponent, DadosPessoaisComponent, NavbarComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

activeTab = 'dados';


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


handleEditClick(): void {
  // Lógica para abrir o formulário de edição
  console.log('Botão editar clicado');
  // Ou navegar para a rota de edição:
  // this.router.navigate(['/editar-perfil']);
}

}
