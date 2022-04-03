const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const sendEmail = (data) => {
  let conteudo = `<section style="display: flex; flex-direction: column; margin: 0 auto; align-items: center; justify-content: center;">
  <h1>Mensagem recebida</h1>
  <ul style="list-style: none;">
    <li>Nome: ${data.nome}</li>
    <li>E-mail: ${data.email}</li>
    <li>Telefone: ${data.telefone}</li>
    <li>Mensagem: ${data.mensagem}</li>
  </ul>
</section>`;

  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "",
        pass: "",
      },
    })
  );

  const mailOptions = {
    from: "",
    to: `${data.email}`,
    subject: `Mensagem recebida!`,
    html: conteudo,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`E-mail enviado para ${mailOptions.to}`);
    }
  });
};

module.exports = { sendEmail };
