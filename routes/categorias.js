const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
/*
    {{url}}/api/categorias
*/

//Obtener todas las categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});
//Obtener una categoria por id - publico
router.get("/:id", (req, res) => {
  res.json("get-id");
});
//Crear categoria - privado - cualquier persona con token valido
router.post("/", (req, res) => {
  res.json("post");
});

//Actualizar -privado - cualquiera con token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

//Borrar una categoria - Solo pueden borrar los Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
