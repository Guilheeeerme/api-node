const express = require("express");
const app = express(); // Instância do express

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("API Started");
});
