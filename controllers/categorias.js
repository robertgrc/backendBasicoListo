const { response } = require("express");
const { Categoria } = require("../models");

//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    total,
    categorias,
  });
};

//obtenerCategoria - populate{}

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);
  //Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

//actualizar Categoria

//borrar Categoria, cambiar el estado del id a false

module.exports = {
  crearCategoria,
  obtenerCategorias,
};
