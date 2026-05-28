import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IaService {
  private apiUrl = environment.iasUrl;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  criar(nome: string) {
    return this.http.post<any>(this.apiUrl, { nome });
  }

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
