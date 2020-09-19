const express = require("express");
const app = express(); // Instância do express

const rotaProdutos = require("./routes/produtos");
const rotaPedidos = require("./routes/pedidos");

const port = process.env.PORT || 3000;

app.use("/produtos", rotaProdutos);
app.use("/pedidos", rotaPedidos);

app.listen(port, () => {
  console.log("API Started");
});
