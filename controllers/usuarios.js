const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 4, desde = 0 } = req.query;
  const usuarios = await Usuario.find().skip(desde).limit(limite);

  res.json({
    usuarios,
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
const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos

  if (password) {
    //Encriptar la contrasenia
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
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
