const express = require("express");
const router = express.Router();

const ProdutosController = require("../controllers/produtos-controller");

router.get("/", ProdutosController.getProdutos);
router.post("/", ProdutosController.postProdutos);
router.get("/:id_produto", ProdutosController.getUmProduto);
router.patch("/:id_produto", ProdutosController.patchUmProduto);
router.delete("/:id_produto", ProdutosController.deleteProduto);

module.exports = router;
