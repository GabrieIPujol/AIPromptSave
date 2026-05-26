import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ListarPromptsComponent } from './listar-prompts/listar-prompts.component';
import { FormPromptComponent } from './form-prompt/form-prompt.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'sobre', component: SobreComponent },
  { path: 'prompts', component: ListarPromptsComponent },
  { path: 'prompts/novo', component: FormPromptComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
