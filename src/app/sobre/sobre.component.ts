import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent {
  titulo = 'Sobre o Projeto';
  descricao = 'O AI Prompt Save é um aplicativo para salvar e organizar prompts de inteligência artificial. Chega de perder aquele prompt perfeito que você criou!';

  tecnologias = ['Angular 16', 'Angular Material', 'TypeScript', 'LocalStorage'];

  autor = 'Enzo Bariotto';
}
