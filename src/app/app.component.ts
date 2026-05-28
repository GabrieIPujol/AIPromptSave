// =============================================================
// AppComponent — Componente raiz da aplicação
// Contém a navbar com links de navegação e o botão de dark mode
// É o primeiro componente carregado (definido no bootstrap do AppModule)
// =============================================================

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',           // Tag usada no index.html: <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  darkMode = false; // Controla o estado atual do tema (claro/escuro)

  ngOnInit() {
    // Ao iniciar, verifica se o usuário já escolheu dark mode antes
    // A preferência fica salva no localStorage do navegador
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.darkMode = true;
      // Aplica o atributo no <html> — o CSS usa [data-theme="dark"] para mudar as cores
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  // Alterna entre tema claro e escuro e salva a preferência no localStorage
  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
