// importtar módulo express
import express from "express";
import bruxos from "./src/data/bruxos.js";

// defiir constante para porta do servidos
const serverPort = 3000;
//Criar servidor com express
const app = express();
// Configurar servidor para aceitar JSON nas requisições
app.use(express.json());
// Criar rota GET "/" que retorna uma mensagem
app.get("/", (req, res) => {
  res.send("<h1>Bem vindo ao mundo de Harry Potter!<h1>");
});

app.get("/bruxos", (req, res) => {
  res.json(bruxos);
});
// Iniciar servidor escutando na porta definida e mostrar mensagem no console
// Rota GET by ID - A estrela do show! ⭐
app.get("/bruxos/:id", (req, res) => {
  // Pega o ID da URL
  const id = parseInt(req.params.id);

  // Busca o bruxo pelo ID
  const bruxo = bruxos.find((b) => b.id === id);

  // Se encontrou, retorna os dados
  if (bruxo) {
    res.json({
      success: true,
      message: `Bruxo ${bruxo.nome} encontrado! ⚡`,
      data: bruxo,
    });
  } else {
    // Se não encontrou, retorna erro 404
    res.status(404).json({
      success: false,
      error: "Bruxo não encontrado 😕",
      message: `Nenhum bruxo com ID ${id} foi encontrado`,
      codigo: "WIZARD_NOT_FOUND",
    });
  }
});

// Rota para buscar TODOS (para comparar)
app.get("/bruxos", (req, res) => {
  res.json({
    success: true,
    message: "Todos os bruxos de Hogwarts! 🏰",
    data: bruxos,
    total: bruxos.length,
  });
});

app.get("/bruxos/nome/:nome", (req, res) => {
  let nome = req.params.nome;
  nome = nome.toLowerCase();
  const bruxosNome = bruxos.filter((b) => b.nome.toLowerCase().includes(nome));

  if (bruxosNome.length > 0) {
    res.status(200).json({
      bruxosNome,
    });
  } else {
    // Se não encontrou, retorna erro 404
    res.status(404).json({
      success: false,
      error: "Bruxo não encontrado 😕",
      message: `Nenhum bruxo com nome ${nome} foi encontrado`,
      codigo: "WIZARD_NOT_FOUND",
    });
  }
});
// /bruxos/casa/:casa

app.get("/bruxos/casa/:casa", (req, res) => {
  let casa = req.params.casa;
  const bruxosCasa = bruxos.filter((b) => b.casa.toLowerCase().includes(casa));

  if (bruxosCasa.length > 0) {
    res.status(200).json({
      bruxosCasa,
    });
  } else {
    // Se não encontrou, retorna erro 404
    res.status(404).json({
      success: false,
      error: "Casa não encontrada 😕",
      message: `Nenhuma casa com nome ${casa} foi encontrada`,
      codigo: "WIZARD_NOT_FOUND",
    });
  }
});

app.listen(serverPort, () => {
  console.log(`API dos Bruxos está no ar em http://localhost:${serverPort}`);
});
