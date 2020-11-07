const express = require("express");
const router = express.Router();

const ProdutosController = require("../controllers/produtos-controller");

router.get("/", ProdutosController.getProducts);
router.post("/", ProdutosController.createProducts);
router.get("/:id_produto", ProdutosController.getProduct);
router.patch("/:id_produto", ProdutosController.updateProduct);
router.delete("/:id_produto", ProdutosController.deleteProduct);

module.exports = router;
