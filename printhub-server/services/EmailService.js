const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

class EmailService {
  constructor() {
    if (!EmailService.instance) {
      this.transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      EmailService.instance = this;
    }

    return EmailService.instance;
  }

  async send(to, subject, htmlFileName, data = {}) {
    const htmlPath = path.join(__dirname, "../", "views", htmlFileName);
    const html = await ejs.renderFile(htmlPath, data);

    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: to,
      subject: subject, 
      html: html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error sending email" };
    }
  }
}

const Mail = new EmailService();

Object.freeze(Mail);

module.exports = Mail;
