const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "sinNombre", apikey } = req.query;

  res.json({
    ok: true,
    msg: "get  API - controller",
    q,
    nombre,
    apikey,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contrasenia
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //guardar en base de datos
  await usuario.save();
  res.json({
    msg: "post  API - controller",
    usuario,
  });
};
const usuariosPut = (req, res) => {
  const { id } = req.params;

  res.json({
    ok: true,
    msg: "put  API - controller",
    id,
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "patch  API - controller",
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "delete  API - controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
