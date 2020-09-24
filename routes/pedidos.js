const express = require("express");
const router = express.Router();
const mysqlConnection = require("../mysql");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM pedidos;";
  mysqlConnection.query(sql, (err, result) => {
    if (err) res.status(400).send({ error: err.message });

    // Ex de "Documentar" caso seja uma API pública, só um exemplo... Acrescentaria mais detalhes, detalhe sobre o tipo de dado no caso de um POST e tals
    const response = {
      quantidade: result.length,
      pedidos: result.map((pedido) => {
        return {
          id_pedido: pedido.id_pedido,
          id_produto: pedido.id_produto,
          quantidade: pedido.quantidade,
          request: {
            tipo: "GET",
            descricao: "Retorna detalhes do pedido",
            url: "http://localhost:3000/pedidos/" + pedido.id_pedido,
          },
        };
      }),
    };
    res.status(201).send(response);
  });
});

router.post("/", (req, res) => {
  // prettier-ignore
  const data = { id_produto: req.body.id_produto, quantidade: req.body.quantidade, };

  const sql = "INSERT INTO pedidos SET ?";
  mysqlConnection.query(sql, data, (err, result) => {
    if (err) res.status(400).send({ error: err.message });
    const response = {
      mensagem: "Pedido inserido com sucesso",
      pedidoCriado: {
        id_pedido: result.id_pedido,
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade,
      },
    };
    res.status(201).send(response);
  });
});

router.get("/:id_pedido", (req, res) => {
  const id = req.params.id_pedido;
  const sql = "SELECT * FROM pedidos WHERE id_pedido = ?";
  mysqlConnection.query(sql, id, (err, pedido) => {
    if (err) res.status(400).send({ error: err.message });
    res.status(201).send({
      message: "Pedido buscado por ID",
      pedido,
    });
  });
});

router.delete("/:id_pedido", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM pedidos WHERE id_pedido = ?",
    [req.params.id_pedido],
    (err, produto, fields) => {
      if (!err) {
        res.status(202).send({ message: "Pedido deletado com sucesso" });
      } else {
        res.status(400).send({ error: err.message });
      }
    }
  );
});

module.exports = router;
