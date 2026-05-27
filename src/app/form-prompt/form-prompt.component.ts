import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-form-prompt',
  templateUrl: './form-prompt.component.html',
  styleUrls: ['./form-prompt.component.css']
})
export class FormPromptComponent implements OnInit {
  prompt: any = { titulo: '', texto: '', ia: '' };
  mensagem: string = '';
  erro: string = '';
  editando: boolean = false;
  id: number = 0;

  constructor(private promptService: PromptService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.editando = true;
      this.promptService.buscarPorId(this.id).subscribe({
        next: (res) => this.prompt = res,
        error: () => this.erro = 'Erro ao carregar o prompt.'
      });
    }
  }

  salvar() {
    if (!this.prompt.titulo || !this.prompt.texto || !this.prompt.ia) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    if (this.editando) {
      this.promptService.atualizar(this.id, this.prompt).subscribe({
        next: () => this.router.navigate(['/prompts']),
        error: () => this.erro = 'Erro ao atualizar o prompt.'
      });
    } else {
      this.promptService.salvar(this.prompt).subscribe({
        next: () => this.router.navigate(['/prompts']),
        error: () => this.erro = 'Erro ao salvar o prompt.'
      });
    }
  }
}
