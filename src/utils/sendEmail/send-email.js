const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICES,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function sendEmail(destinatario, assunto, corpo) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: destinatario,
    subject: assunto,
    html: corpo,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.response);
  } catch (error) {
    console.log('Erro ao enviar o e-mail:', error);
  }
}

module.exports = sendEmail;
