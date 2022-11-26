const response = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "un usuario ya existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    //Encriptar la contrasena

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el administrador",
    });
  }
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "LoginUsuario",
    email,
    password,
  });
};
const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "revalidarToken!!",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
