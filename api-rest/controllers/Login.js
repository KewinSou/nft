const { prisma } = require("../data/index");
const { Logger } = require("../utils/log");
const { encrypt, verify } = require("../utils/bcrypt");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensagem: "Faltam de dados de login",
        error: true,
      });
    }

    const checkUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return res.status(400).json({
        mensagem: "Usuário não encontrado",
        error: true,
      });
    }

    const checkPassword = verify(password, checkUser.password);

    if (!checkPassword) {
      return res.status(401).json({
        mensagem: "Senha incorreta",
        error: true,
      });
    }

    res.status(200).json({
      mensagem: "Login autorizado com sucesso",
      error: false,
    });
  } catch (err) {
    Logger.info(err);
  }
};

const createLogin = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        mensagem: "Faltam informações de cadastro.",
        error: true,
      });
    }

    const verifyUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (verifyUser) {
      return res.status(400).json({
        mensagem: "Já existe um usuário cadastrado com este e-mail",
        error: true,
      });
    }

    const encryptedPass = encrypt(password);

    await prisma.users.create({
      data: {
        name,
        email,
        password: encryptedPass,
      },
    });

    res.status(200).json({
      mensagem: "Usuário criado com sucesso.",
      error: false,
    });
  } catch (err) {
    Logger.error(err);
  }
};

module.exports = { userLogin, createLogin };
