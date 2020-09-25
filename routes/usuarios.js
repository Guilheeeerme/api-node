const express = require("express");
const router = express.Router();
const mysqlConnection = require("../mysql");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  const { email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  const data = { email: email, senha: hash };

  const sql = "INSERT INTO usuarios SET ?";

  mysqlConnection.query(sql, data, (err, results) => {
    if (err) res.status(400).send({ error: err.message });
    const response = {
      mensagem: "Usuário criado com sucesso",
      usuarioCriado: {
        id_usuario: results.insertId,
        email: req.body.email,
      },
    };
    res.status(201).send(response);
  });
});

module.exports = router;
