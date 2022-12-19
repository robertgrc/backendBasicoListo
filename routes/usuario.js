const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio y mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    //check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom((rol) => esRolValido(rol)),

    validarCampos,
  ],
  usuariosPost
);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
