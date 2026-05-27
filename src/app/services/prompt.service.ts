import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private apiUrl = 'http://localhost:3000/api/prompts';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarPorId(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  salvar(prompt: any) {
    return this.http.post<any>(this.apiUrl, prompt);
  }

  atualizar(id: number, prompt: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, prompt);
  }

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
