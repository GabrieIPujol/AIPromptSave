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
    this.prompts = this.promptService.listar();
  }

  deletarPrompt(id: number) {
    if (confirm('Tem certeza que deseja excluir este prompt?')) {
      this.promptService.deletar(id);
      this.mensagem = 'Prompt excluído com sucesso.';
      this.carregarPrompts();
    }
  }
}
