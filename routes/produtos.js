const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.status(200).send({
      message: "Método GET para buscar todos os produtos",
    });
  })
  .post("/", (req, res) => {
    res.status(201).send({
      message: "Método POST para inserir um produto",
    });
  });

router
  .get("/:id", (req, res) => {
    const id = req.params.id;
    res.status(201).send({
      message: "Método GET para buscar um ID específico",
      id,
    });
  })
  .patch("/:id", (req, res) => {
    const id = req.params.id;
    res.status(201).send({
      message: "Método PATCH/PUT para buscar um ID específico e atualizar",
      id,
    });
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    res.status(201).send({
      message: "Método DELETE para buscar um ID específico e excluir",
      id,
    });
  });

module.exports = router;