import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "harshit@coffytobussines.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "reset your password",
      html: "<b>Hello world?</b>", // html body
    };
    const mailResponse = await transporter.sendMail(mailOption);
    return mailOption;
  } catch (error) {
    throw new Error(error.message);
  }
};
