import { Component } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';
import { Routes } from '@angular/router';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { FormacaoAcademicaComponent } from './formacao-academica/formacao-academica.component';
import { ExperienciaProfissionalComponent } from './experiencia-profissional/experiencia-profissional.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { InfoComportamentaisComponent } from './info-comportamentais/info-comportamentais.component';
import { DiscComponent } from './disc/disc.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormularioComponent } from './formulario/formulario.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin/admin.component';

export const routes: Routes = [

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent},
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'formulario', component: FormularioComponent },
  { path: 'dados-pessoais', component: DadosPessoaisComponent },
  { path: 'formacao-academica', component: FormacaoAcademicaComponent },
  { path: 'experiencia-profissional', component: ExperienciaProfissionalComponent },
  { path: 'habilidades', component: HabilidadesComponent },
  { path: 'info-comportamentais', component: InfoComportamentaisComponent },
  { path: 'disc', component: DiscComponent },
  { path: 'curriculum', component: CurriculumComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'logout', component: LogoutComponent }
];
