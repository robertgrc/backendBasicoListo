const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verficar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos-correo",
      });
    }

    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos-correo",
      });
    }
    //Verificar la contrasenia
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos-password",
      });
    }

    //Generar JWT

    res.json({
      msg: "Login OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};