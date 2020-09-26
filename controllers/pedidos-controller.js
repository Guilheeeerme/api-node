const mysqlConnection = require("../mysql");

exports.getPedidos = (req, res) => {
  const sql = `SELECT pedidos.id_pedido,
                      pedidos.quantidade,
                      produtos.id_produto,
                      produtos.nome,
                      produtos.preco
              FROM 		pedidos
          INNER JOIN 	produtos
                ON 		produtos.id_produto = pedidos.id_produto;`;
  mysqlConnection.query(sql, (err, result) => {
    if (err) res.status(400).send({ error: err.message });

    // Ex de "Documentar" caso seja uma API pública, só um exemplo... Acrescentaria mais detalhes, detalhe sobre o tipo de dado no caso de um POST e tals
    const response = {
      pedidos: result.map((pedido) => {
        return {
          id_pedido: pedido.id_pedido,
          quantidade: pedido.quantidade,
          produto: {
            id_produto: pedido.id_produto,
            nome: pedido.nome,
            preco: pedido.preco,
          },
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
};

exports.postPedidos = (req, res) => {
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
};

exports.getUmPedido = (req, res) => {
  const id = req.params.id_pedido;
  const sql = "SELECT * FROM pedidos WHERE id_pedido = ?";
  mysqlConnection.query(sql, id, (err, pedido) => {
    if (err) res.status(400).send({ error: err.message });
    res.status(201).send({
      message: "Pedido buscado por ID",
      pedido,
    });
  });
};

exports.deletePedido = (req, res) => {
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
};
