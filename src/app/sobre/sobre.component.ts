// =============================================================
// SobreComponent — Página "Sobre o Projeto" (rota: "/sobre")
// Exibe informações sobre a aplicação, tecnologias e autor
// Dados estáticos — não usa nenhum serviço
// =============================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent {
  titulo = 'Sobre o Projeto';
  descricao = 'O AI Prompt Save é um aplicativo para salvar e organizar prompts de inteligência artificial. Chega de perder aquele prompt perfeito que você criou!';

  // Lista de tecnologias exibida na página
  tecnologias = ['Angular 16', 'Angular Material', 'TypeScript', 'Node.js', 'SQLite'];

  autores = ['Enzo Bariotto', 'Stephany Silva', 'Gabriel Pujol'];
}
