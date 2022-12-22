const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria } = require("../controllers/categorias");
const { validarJWT, validarCampos } = require("../middlewares");

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
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar -privado - cualquiera con token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

//Borrar una categoria - Solo pueden borrar los Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
