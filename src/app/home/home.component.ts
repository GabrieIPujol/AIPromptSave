import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  titulo = 'AI Prompt Save';
  descricao = 'Salve e organize seus prompts favoritos para IAs como ChatGPT, Gemini e Claude.';
}
