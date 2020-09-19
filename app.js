const express = require("express");
const app = express(); // Instância do express
const morgan = require("morgan"); // Monitora as requisiçoes e mostra logs no console

const rotaProdutos = require("./routes/produtos");
const rotaPedidos = require("./routes/pedidos");

const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use("/produtos", rotaProdutos);
app.use("/pedidos", rotaPedidos);

// Tratamendo de erro para quando não for encotrada nenhum rota na requisição.
app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({ erro: { message: error.message } });
});

app.listen(port, () => {
  console.log("API Started");
});
