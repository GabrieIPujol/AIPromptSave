// =============================================================
// ListarPromptsComponent — Exibe todos os prompts salvos (rota: "/prompts")
// Carrega os dados do backend via PromptService ao iniciar
// Permite deletar e navegar para editar cada prompt
// =============================================================

import { Component, OnInit } from '@angular/core';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-listar-prompts',
  templateUrl: './listar-prompts.component.html',
  styleUrls: ['./listar-prompts.component.css']
})
export class ListarPromptsComponent implements OnInit {
  prompts: any[] = []; // Array que guarda os prompts vindos do backend
  erro: string = '';       // Mensagem de erro exibida caso a requisição falhe
  mensagem: string = '';   // Mensagem de sucesso após deletar

  constructor(private promptService: PromptService) {}

  // Carrega a lista de prompts assim que o componente é exibido na tela
  ngOnInit(): void {
    this.carregarPrompts();
  }

  // Faz GET /api/prompts e preenche o array this.prompts
  carregarPrompts() {
    this.promptService.listar().subscribe({
      next: (res) => this.prompts = res,
      error: () => this.erro = 'Erro ao carregar os prompts.'
    });
  }

  // Pede confirmação e faz DELETE /api/prompts/:id
  // Após deletar, recarrega a lista automaticamente
  deletarPrompt(id: number) {
    if (confirm('Tem certeza que deseja excluir este prompt?')) {
      this.promptService.deletar(id).subscribe({
        next: () => {
          this.mensagem = 'Prompt excluído com sucesso.';
          this.carregarPrompts(); // Atualiza a lista sem precisar recarregar a página
        },
        error: () => this.mensagem = 'Erro ao excluir prompt.'
      });
    }
  }
}
