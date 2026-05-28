// =============================================================
// AppModule — Módulo raiz da aplicação Angular
// Aqui são declarados todos os componentes e importados todos
// os módulos externos (Angular Material, HTTP, Forms, etc.)
// =============================================================

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necessário para animações do Material
import { FormsModule } from '@angular/forms';           // Two-way binding com [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // Para fazer requisições HTTP no PromptService

// Componentes do Angular Material usados na aplicação
import { MatToolbarModule } from '@angular/material/toolbar';   // Barra de navegação superior
import { MatButtonModule } from '@angular/material/button';     // Botões estilizados
import { MatIconModule } from '@angular/material/icon';         // Ícones do Material (psychology, add, delete...)
import { MatCardModule } from '@angular/material/card';         // Cards dos prompts na listagem
import { MatFormFieldModule } from '@angular/material/form-field'; // Campos do formulário
import { MatInputModule } from '@angular/material/input';       // Input e textarea
import { MatSelectModule } from '@angular/material/select';     // Dropdown de seleção da IA
import { MatChipsModule } from '@angular/material/chips';       // Chip colorido com o nome da IA no card

import { AppRoutingModule } from './app-routing.module'; // Configuração das rotas

// Componentes da aplicação
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ListarPromptsComponent } from './listar-prompts/listar-prompts.component';
import { FormPromptComponent } from './form-prompt/form-prompt.component';

@NgModule({
  declarations: [
    // Todos os componentes criados precisam ser declarados aqui
    AppComponent,
    HomeComponent,
    SobreComponent,
    ListarPromptsComponent,
    FormPromptComponent
  ],
  imports: [
    // Módulos externos e do Angular que os componentes utilizam
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Componente inicial carregado no index.html
})
export class AppModule { }
