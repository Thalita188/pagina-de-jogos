const express = require('express');
const app = express();

// Middleware para interpretar o corpo da requisição como JSON
app.use(express.json());

// Dados fictícios para jogos
const jogos = [
  { id: 1, nome: 'Jogo 1', descricao: 'Descrição do Jogo 1', avaliacao: 4.5 },
  { id: 2, nome: 'Jogo 2', descricao: 'Descrição do Jogo 2', avaliacao: 3.8 },
];

// Rota para listar todos os jogos
app.get('/api/jogos', (req, res) => {
  res.json(jogos);
});

// Rota para obter detalhes de um jogo
app.get('/api/jogos/:id', (req, res) => {
  const jogo = jogos.find(j => j.id == req.params.id);
  if (!jogo) return res.status(404).json({ message: 'Jogo não encontrado' });
  res.json(jogo);
});

// Rota para adicionar um novo jogo
app.post('/api/jogos', (req, res) => {
  const { nome, descricao, avaliacao } = req.body;
  const novoJogo = { id: jogos.length + 1, nome, descricao, avaliacao };
  jogos.push(novoJogo);
  res.status(201).json(novoJogo);
});

// Rota para atualizar um jogo
app.put('/api/jogos/:id', (req, res) => {
  const jogo = jogos.find(j => j.id == req.params.id);
  if (!jogo) return res.status(404).json({ message: 'Jogo não encontrado' });

  const { nome, descricao, avaliacao } = req.body;
  jogo.nome = nome || jogo.nome;
  jogo.descricao = descricao || jogo.descricao;
  jogo.avaliacao = avaliacao || jogo.avaliacao;

  res.json(jogo);
});

// Rota para excluir um jogo
app.delete('/api/jogos/:id', (req, res) => {
  const index = jogos.findIndex(j => j.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Jogo não encontrado' });
  
  jogos.splice(index, 1);
  res.status(204).send();
});

// Configurar a porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
