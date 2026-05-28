// =============================================================
// PromptService — Serviço responsável por toda comunicação HTTP
// com o backend (Express em http://localhost:3000)
// Injetado nos componentes que precisam de dados: Listar e Form
// =============================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Disponível em toda a aplicação (singleton global)
})
export class PromptService {
  // URL base do backend — vem do environment (local ou produção)
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Busca todos os prompts (retorna Observable de array)
  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Busca um prompt específico pelo ID
  buscarPorId(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Cria um novo prompt — body: { titulo, texto, ia }
  salvar(prompt: any) {
    return this.http.post<any>(this.apiUrl, prompt);
  }

  // Atualiza um prompt existente pelo ID — body: { titulo, texto, ia }
  atualizar(id: number, prompt: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, prompt);
  }

  // Remove um prompt pelo ID
  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
