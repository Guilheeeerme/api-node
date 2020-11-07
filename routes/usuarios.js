const express = require("express");
const router = express.Router();

const UsuariosController = require("../controllers/usuarios-controller");

router.post("/", UsuariosController.createUser);

module.exports = router;
