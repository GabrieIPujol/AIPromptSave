// =============================================================
// BACKEND - servidor Express com banco de dados SQLite (sql.js)
// Roda em: http://localhost:3000
// =============================================================

const express = require('express');
const cors = require('cors');
const initSqlJs = require('sql.js'); // SQLite rodando dentro do Node.js (sem instalação nativa)
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());         // Permite requisições do Angular (localhost:4200) para cá (localhost:3000)
app.use(express.json()); // Permite ler o corpo das requisições como JSON

// Caminho do arquivo físico do banco de dados (gerado na raiz do projeto)
const DB_PATH = path.join(__dirname, 'prompts.db');

let db; // Instância do banco de dados em memória

// Persiste o banco em memória para o arquivo prompts.db no disco
function salvarDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// Inicializa o sql.js e só depois define as rotas (precisa do banco pronto)
initSqlJs().then((SQL) => {

  // Se o arquivo de banco já existe, carrega ele; senão, cria um banco novo
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Cria a tabela "prompts" caso ainda não exista
  // Campos: id (chave primária), titulo, texto, ia e a data de criação automática
  db.run(`
    CREATE TABLE IF NOT EXISTS prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      texto TEXT NOT NULL,
      ia TEXT NOT NULL,
      criado_em TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // Cria a tabela "ias" e popula com os valores padrão se estiver vazia
  db.run(`
    CREATE TABLE IF NOT EXISTS ias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL UNIQUE
    )
  `);

  const iaCount = db.exec('SELECT COUNT(*) FROM ias')[0].values[0][0];
  if (iaCount === 0) {
    ['ChatGPT', 'Gemini', 'Claude', 'Copilot'].forEach(nome => {
      db.run('INSERT INTO ias (nome) VALUES (?)', [nome]);
    });
  }

  salvarDb();

  // -------------------------------------------------------
  // GET /api/ias — Lista todas as IAs cadastradas
  // -------------------------------------------------------
  app.get('/api/ias', (req, res) => {
    const stmt = db.prepare('SELECT * FROM ias ORDER BY nome ASC');
    const ias = [];
    while (stmt.step()) ias.push(stmt.getAsObject());
    stmt.free();
    res.json(ias);
  });

  // -------------------------------------------------------
  // POST /api/ias — Cria uma nova IA. Body: { nome }
  // -------------------------------------------------------
  app.post('/api/ias', (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Informe o nome da IA.' });
    try {
      db.run('INSERT INTO ias (nome) VALUES (?)', [nome.trim()]);
      salvarDb();
      res.status(201).json({ mensagem: 'IA cadastrada.' });
    } catch (e) {
      res.status(400).json({ erro: 'Essa IA já existe.' });
    }
  });

  // -------------------------------------------------------
  // DELETE /api/ias/:id — Remove uma IA pelo ID
  // -------------------------------------------------------
  app.delete('/api/ias/:id', (req, res) => {
    db.run('DELETE FROM ias WHERE id = ?', [Number(req.params.id)]);
    salvarDb();
    res.json({ mensagem: 'IA removida.' });
  });

  // -------------------------------------------------------
  // GET /api/prompts — Lista todos os prompts (mais recentes primeiro)
  // -------------------------------------------------------
  app.get('/api/prompts', (req, res) => {
    const stmt = db.prepare('SELECT * FROM prompts ORDER BY id DESC');
    const prompts = [];
    while (stmt.step()) {
      prompts.push(stmt.getAsObject()); // Cada linha vira um objeto JS
    }
    stmt.free(); // Libera o statement para não vazar memória
    res.json(prompts);
  });

  // -------------------------------------------------------
  // GET /api/prompts/:id — Busca um prompt específico pelo ID
  // -------------------------------------------------------
  app.get('/api/prompts/:id', (req, res) => {
    const stmt = db.prepare('SELECT * FROM prompts WHERE id = ?');
    stmt.bind([Number(req.params.id)]);
    if (stmt.step()) {
      res.json(stmt.getAsObject());
    } else {
      res.status(404).json({ erro: 'Prompt não encontrado' });
    }
    stmt.free();
  });

  // -------------------------------------------------------
  // POST /api/prompts — Cria um novo prompt
  // Body esperado: { titulo, texto, ia }
  // -------------------------------------------------------
  app.post('/api/prompts', (req, res) => {
    const { titulo, texto, ia } = req.body;
    if (!titulo || !texto || !ia) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }
    db.run('INSERT INTO prompts (titulo, texto, ia) VALUES (?, ?, ?)', [titulo, texto, ia]);
    salvarDb(); // Persiste no arquivo após inserção

    // Retorna o registro recém-criado
    const stmt = db.prepare('SELECT * FROM prompts ORDER BY id DESC LIMIT 1');
    stmt.step();
    const novo = stmt.getAsObject();
    stmt.free();
    res.status(201).json(novo);
  });

  // -------------------------------------------------------
  // PUT /api/prompts/:id — Atualiza um prompt existente
  // Body esperado: { titulo, texto, ia }
  // -------------------------------------------------------
  app.put('/api/prompts/:id', (req, res) => {
    const { titulo, texto, ia } = req.body;
    if (!titulo || !texto || !ia) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }
    db.run('UPDATE prompts SET titulo = ?, texto = ?, ia = ? WHERE id = ?', [titulo, texto, ia, Number(req.params.id)]);
    salvarDb(); // Persiste no arquivo após atualização

    // Retorna o registro atualizado
    const stmt = db.prepare('SELECT * FROM prompts WHERE id = ?');
    stmt.bind([Number(req.params.id)]);
    if (stmt.step()) {
      res.json(stmt.getAsObject());
    } else {
      res.status(404).json({ erro: 'Prompt não encontrado' });
    }
    stmt.free();
  });

  // -------------------------------------------------------
  // DELETE /api/prompts/:id — Remove um prompt pelo ID
  // -------------------------------------------------------
  app.delete('/api/prompts/:id', (req, res) => {
    db.run('DELETE FROM prompts WHERE id = ?', [Number(req.params.id)]);
    salvarDb(); // Persiste no arquivo após exclusão
    res.json({ mensagem: 'Prompt excluído com sucesso.' });
  });

  // Render exige que o servidor escute na variável PORT do ambiente
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
});
