const express = require("express");
const app = express(); // Instância do express
const rotaProdutos = require("./routes/produtos.js");

const port = process.env.PORT || 3000;

app.use("/produtos", rotaProdutos);

app.listen(port, () => {
  console.log("API Started");
});
