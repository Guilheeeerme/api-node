const express = require("express");
const router = express.Router();

const PedidosController = require("../controllers/pedidos-controller");

router.get("/", PedidosController.getOrders);
router.post("/", PedidosController.createOrders);
router.get("/:id_pedido", PedidosController.getAnOrder);
router.delete("/:id_pedido", PedidosController.deleteOrder);

module.exports = router;
