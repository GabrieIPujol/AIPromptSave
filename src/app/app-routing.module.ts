// =============================================================
// AppRoutingModule — Configuração de rotas da aplicação
// Define qual componente é exibido para cada URL acessada
// O <router-outlet> no app.component.html renderiza o componente ativo
// =============================================================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ListarPromptsComponent } from './listar-prompts/listar-prompts.component';
import { FormPromptComponent } from './form-prompt/form-prompt.component';

const routes: Routes = [
  { path: '', component: HomeComponent },                           // "/" → Página inicial
  { path: 'home', redirectTo: '', pathMatch: 'full' },             // "/home" redireciona para "/"
  { path: 'sobre', component: SobreComponent },                    // "/sobre" → Página sobre
  { path: 'prompts', component: ListarPromptsComponent },          // "/prompts" → Lista de prompts
  { path: 'prompts/novo', component: FormPromptComponent },        // "/prompts/novo" → Criar prompt
  { path: 'prompts/editar/:id', component: FormPromptComponent }   // "/prompts/editar/5" → Editar prompt (id=5)
  // O FormPromptComponent é reutilizado para criar E editar — ele detecta o :id na URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
