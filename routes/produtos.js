const express = require("express");
const router = express.Router();
const mysqlConnection = require("../mysql"); // Neste arquivo já está importando o mysql

router.get("/", (req, res) => {
  const sql = "SELECT * FROM produtos;";
  mysqlConnection.query(sql, (err, produtos) => {
    if (err) res.status(400).send({ error: err.message });
    res.status(201).send({
      message: "Lista de todos os produtos",
      produtos,
    });
  });
});

router.post("/", (req, res) => {
  const data = { nome: req.body.nome, preco: req.body.preco };
  const sql = "INSERT INTO produtos SET ?";
  mysqlConnection.query(sql, data, (err, results) => {
    if (err) res.status(400).send({ error: err.message });
    res.status(201).send({
      message: "Produto inserido com sucesso",
      produto: data,
    });
  });
});

router
  .get("/:id_produto", (req, res) => {
    const id = req.params.id_produto;
    const sql = "SELECT * FROM produtos WHERE id_produto = ?";
    mysqlConnection.query(sql, id, (err, produto) => {
      if (err) res.status(400).send({ error: err.message });
      res.status(201).send({
        message: "Produto buscado por ID",
        produto,
      });
    });
  })
  .patch("/:id_produto", (req, res) => {
    const id = req.params.id_produto;
    const { nome, preco } = req.body;

    //prettier-ignore
    const sql = "UPDATE produtos SET nome='"+nome+"', preco='"+preco+"' WHERE id_produto = '"+id+"'"; // mariadb syntax

    mysqlConnection.query(sql, (err, produto) => {
      if (err) res.status(400).send({ error: err.message });
      res.status(202).send({
        message: "Produto atualizado com sucesso",
        produto: { nome, preco },
      });
    });
  })
  .delete("/:id_produto", (req, res) => {
    mysqlConnection.query(
      "DELETE FROM produtos WHERE id_produto = ?",
      [req.params.id_produto],
      (err, produto, fields) => {
        if (!err) {
          res.status(202).send({ message: "Produto deletado com sucesso" });
        } else {
          res.status(400).send({ error: err.message });
        }
      }
    );
  });

module.exports = router;
