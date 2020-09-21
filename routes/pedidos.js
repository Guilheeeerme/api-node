const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.status(200).send({
      message: "Método GET para buscar todos os pedidos",
    });
  })
  .post("/", (req, res) => {
    const pedido = { id_pedido: req.body.id, qtde: req.body.qtde };
    res.status(201).send({
      message: "Método POST para inserir um pedido",
      pedidoCriado: pedido,
    });
  });

router
  .get("/:id_pedido", (req, res) => {
    const id = req.params.id_pedido;
    res.status(201).send({
      message: "Método GET para buscar um pedido por ID específico",
      id,
    });
  })
  .patch("/:id_pedido", (req, res) => {
    const id = req.params.id_pedido;
    res.status(201).send({
      message:
        "Método PATCH/PUT para buscar um pedido por ID específico e atualizar",
      id,
    });
  })
  .delete("/:id_pedido", (req, res) => {
    const id = req.params.id;
    res.status(204).send({
      message:
        "Método DELETE para buscar um pedido por ID específico e excluir",
      id,
    });
  });

module.exports = router;
