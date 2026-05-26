import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private chave = 'prompts';

  listar() {
    const dados = localStorage.getItem(this.chave);
    return dados ? JSON.parse(dados) : [];
  }

  salvar(prompt: any) {
    const lista = this.listar();
    lista.push(prompt);
    localStorage.setItem(this.chave, JSON.stringify(lista));
  }

  deletar(id: any) {
    const lista = this.listar().filter((p: any) => p.id !== id);
    localStorage.setItem(this.chave, JSON.stringify(lista));
  }
}
