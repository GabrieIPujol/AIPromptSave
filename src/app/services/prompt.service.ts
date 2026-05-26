import { Injectable } from '@angular/core';
import { Prompt } from '../models/prompt.model';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private chave = 'prompts';

  listar(): Prompt[] {
    const dados = localStorage.getItem(this.chave);
    return dados ? JSON.parse(dados) : [];
  }

  salvar(prompt: Prompt): void {
    const lista = this.listar();
    lista.push(prompt);
    localStorage.setItem(this.chave, JSON.stringify(lista));
  }

  deletar(id: number): void {
    const lista = this.listar().filter(p => p.id !== id);
    localStorage.setItem(this.chave, JSON.stringify(lista));
  }
}
