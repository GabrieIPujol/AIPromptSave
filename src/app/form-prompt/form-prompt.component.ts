// =============================================================
// FormPromptComponent — Formulário de criar OU editar prompt
// Rota criar: "/prompts/novo"
// Rota editar: "/prompts/editar/:id"
// O componente detecta o :id na URL para saber em qual modo está
// =============================================================

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-form-prompt',
  templateUrl: './form-prompt.component.html',
  styleUrls: ['./form-prompt.component.css']
})
export class FormPromptComponent implements OnInit {
  // Objeto que faz two-way binding com os campos do formulário via [(ngModel)]
  prompt: any = { titulo: '', texto: '', ia: '' };
  erro: string = '';       // Exibido no template quando campos não estão preenchidos
  editando: boolean = false; // false = modo criação | true = modo edição
  id: number = 0;           // ID do prompt sendo editado (0 quando criando)

  constructor(
    private promptService: PromptService,
    private router: Router,       // Para redirecionar após salvar
    private route: ActivatedRoute // Para ler o :id da URL
  ) {}

  ngOnInit(): void {
    // Verifica se existe um :id na URL — se sim, entra em modo edição
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.editando = true;
      // Carrega os dados do prompt existente para preencher o formulário
      this.promptService.buscarPorId(this.id).subscribe({
        next: (res) => this.prompt = res,
        error: () => this.erro = 'Erro ao carregar o prompt.'
      });
    }
  }

  // Chamado pelo botão "Salvar" do formulário
  // Valida os campos e faz POST (criar) ou PUT (editar) conforme o modo
  salvar() {
    if (!this.prompt.titulo || !this.prompt.texto || !this.prompt.ia) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    if (this.editando) {
      // Modo edição: atualiza o prompt existente via PUT /api/prompts/:id
      this.promptService.atualizar(this.id, this.prompt).subscribe({
        next: () => this.router.navigate(['/prompts']), // Volta para a lista após salvar
        error: () => this.erro = 'Erro ao atualizar o prompt.'
      });
    } else {
      // Modo criação: cria novo prompt via POST /api/prompts
      this.promptService.salvar(this.prompt).subscribe({
        next: () => this.router.navigate(['/prompts']), // Volta para a lista após salvar
        error: () => this.erro = 'Erro ao salvar o prompt.'
      });
    }
  }
}
