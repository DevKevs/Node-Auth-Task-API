const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, PostUser } = require("../controllers/authController");
const validationErros = require("../middlewares/validationErrors")

const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("email", "El formato de correo es invalido").isEmail(),
    check(
      "password",
      "La contraseña debe ser de 6 caracteres como minimo"
    ).isLength({ min: 6 }),
    check("username", "El nombre de usuario es requerido").not().isEmpty(),
    validationErros
  ],
  PostUser
);

authRouter.post(
  "/login",
  [
    check("email", "El formato de correo es invalido").isEmail(),
    check(
      "password",
      "La contraseña debe ser de 5 caracteres como minimo"
    ).isLength({ min: 5 }),
    validationErros
  ],
  loginUser
);

module.exports = authRouter;
