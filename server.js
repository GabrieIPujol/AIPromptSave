const express = require('express');
const cors = require('cors');
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'prompts.db');

let db;

function salvarDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

initSqlJs().then((SQL) => {
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      texto TEXT NOT NULL,
      ia TEXT NOT NULL,
      criado_em TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  salvarDb();

  app.get('/api/prompts', (req, res) => {
    const stmt = db.prepare('SELECT * FROM prompts ORDER BY id DESC');
    const prompts = [];
    while (stmt.step()) {
      prompts.push(stmt.getAsObject());
    }
    stmt.free();
    res.json(prompts);
  });

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

  app.post('/api/prompts', (req, res) => {
    const { titulo, texto, ia } = req.body;
    if (!titulo || !texto || !ia) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }
    db.run('INSERT INTO prompts (titulo, texto, ia) VALUES (?, ?, ?)', [titulo, texto, ia]);
    salvarDb();
    const stmt = db.prepare('SELECT * FROM prompts ORDER BY id DESC LIMIT 1');
    stmt.step();
    const novo = stmt.getAsObject();
    stmt.free();
    res.status(201).json(novo);
  });

  app.put('/api/prompts/:id', (req, res) => {
    const { titulo, texto, ia } = req.body;
    if (!titulo || !texto || !ia) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }
    db.run('UPDATE prompts SET titulo = ?, texto = ?, ia = ? WHERE id = ?', [titulo, texto, ia, Number(req.params.id)]);
    salvarDb();
    const stmt = db.prepare('SELECT * FROM prompts WHERE id = ?');
    stmt.bind([Number(req.params.id)]);
    if (stmt.step()) {
      res.json(stmt.getAsObject());
    } else {
      res.status(404).json({ erro: 'Prompt não encontrado' });
    }
    stmt.free();
  });

  app.delete('/api/prompts/:id', (req, res) => {
    db.run('DELETE FROM prompts WHERE id = ?', [Number(req.params.id)]);
    salvarDb();
    res.json({ mensagem: 'Prompt excluído com sucesso.' });
  });

  const PORT = 3000;
  app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
});
