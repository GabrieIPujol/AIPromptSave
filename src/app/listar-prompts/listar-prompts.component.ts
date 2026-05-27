import { Component, OnInit } from '@angular/core';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-listar-prompts',
  templateUrl: './listar-prompts.component.html',
  styleUrls: ['./listar-prompts.component.css']
})
export class ListarPromptsComponent implements OnInit {
  prompts: any[] = [];
  erro: string = '';
  mensagem: string = '';

  constructor(private promptService: PromptService) {}

  ngOnInit(): void {
    this.carregarPrompts();
  }

  carregarPrompts() {
    this.promptService.listar().subscribe({
      next: (res) => this.prompts = res,
      error: () => this.erro = 'Erro ao carregar os prompts.'
    });
  }

  deletarPrompt(id: number) {
    if (confirm('Tem certeza que deseja excluir este prompt?')) {
      this.promptService.deletar(id).subscribe({
        next: () => {
          this.mensagem = 'Prompt excluído com sucesso.';
          this.carregarPrompts();
        },
        error: () => this.mensagem = 'Erro ao excluir prompt.'
      });
    }
  }
}
