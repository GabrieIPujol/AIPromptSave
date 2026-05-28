import { Component, OnInit } from '@angular/core';
import { IaService } from '../services/ia.service';

@Component({
  selector: 'app-gerenciar-ias',
  templateUrl: './gerenciar-ias.component.html',
  styleUrls: ['./gerenciar-ias.component.css']
})
export class GerenciarIasComponent implements OnInit {
  ias: any[] = [];
  novaIa = '';
  erro = '';
  mensagem = '';

  constructor(private iaService: IaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.iaService.listar().subscribe({
      next: (res) => this.ias = res,
      error: () => this.erro = 'Erro ao carregar IAs.'
    });
  }

  adicionar() {
    if (!this.novaIa.trim()) { this.erro = 'Digite o nome da IA.'; return; }
    this.erro = '';
    this.iaService.criar(this.novaIa).subscribe({
      next: () => { this.novaIa = ''; this.mensagem = 'IA adicionada!'; this.carregar(); },
      error: (e) => this.erro = e.error?.erro || 'Erro ao adicionar IA.'
    });
  }

  deletar(id: number) {
    if (confirm('Remover esta IA?')) {
      this.iaService.deletar(id).subscribe({
        next: () => { this.mensagem = 'IA removida.'; this.carregar(); },
        error: () => this.erro = 'Erro ao remover IA.'
      });
    }
  }
}
