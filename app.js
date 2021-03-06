const express = require("express");
const app = express(); // Instância do express
const morgan = require("morgan"); // Monitora as requisiçoes e mostra logs no console
const cors = require("cors");

const routeProducts = require("./routes/produtos");
const routeOrders = require("./routes/pedidos");
const userRoute = require("./routes/usuarios");

app.use(morgan("dev"));

// Não é mais necessário o módulo bodyParser, utilizamos direto do express
app.use(express.urlencoded({ extended: false })); // Apenas dados simples
app.use(express.json()); // JSON de entrada no body

// Rotas
app.use("/produtos", routeProducts);
app.use("/pedidos", routeOrders);
app.use("/usuarios", userRoute);

app.use(cors);

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API Started");
});
