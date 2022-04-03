const { Router, json } = require("express");
const { Logger } = require("../utils/log");
const { userLogin, createLogin } = require("../controllers/Login");
const { sendEmail } = require("../controllers/Email");
const router = Router();

router.use(json());

router.use((req, res, next) => {
  Logger.info(`${req.method} ${req.url} - Host ${req.hostname}`);
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({
    error: 0,
    message: "API rodando corretamente.",
  });
});

/* ----- LOGIN ----- */

router.post("/login", userLogin);
router.post("/login/create", createLogin);

/* ----- END LOGIN ----- */

router.post("/enviar-email", (req, res, next) => {
  sendEmail(req.body);

  res.status(200).json({
    mensagem: "E-mail enviado!",
    status: "Sucesso!",
  });
});

module.exports = { router };
