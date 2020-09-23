const express = require("express");
const router = express.Router();
const mysqlConnection = require("../mysql"); // Neste arquivo já está importando o mysql

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
  let data = { nome: req.body.nome, preco: req.body.preco };
  let sql = "INSERT INTO produtos SET ?";
  mysqlConnection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.status(201).send({
      message: "Produto inserido com sucesso",
      produto: data,
    });
  });
});

router
  .get("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
      res.status(201).send({
        message: "Método GET para buscar um produto por ID específico",
        id,
      });
    }
  })
  .patch("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
      res.status(201).send({
        message:
          "Método PATCH/PUT para buscar um produto por ID específico e atualizar",
        id,
      });
    }
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
      res.status(204).send({
        message:
          "Método DELETE para buscar um produto por ID específico e excluir",
        id,
      });
    }
  });

module.exports = router;
