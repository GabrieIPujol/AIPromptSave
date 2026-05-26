import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-form-prompt',
  templateUrl: './form-prompt.component.html',
  styleUrls: ['./form-prompt.component.css']
})
export class FormPromptComponent implements OnInit {
  prompt = { titulo: '', texto: '', ia: '' };
  mensagem: string = '';
  erro: string = '';

  constructor(private promptService: PromptService, private router: Router) {}

  ngOnInit(): void {}

  salvar() {
    if (!this.prompt.titulo || !this.prompt.texto || !this.prompt.ia) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.promptService.salvar({
      id: Date.now(),
      titulo: this.prompt.titulo,
      texto: this.prompt.texto,
      ia: this.prompt.ia
    });

    this.router.navigate(['/prompts']);
  }
}
