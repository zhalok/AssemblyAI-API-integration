const nodemailer = require("nodemailer");
async function sendMail(to, subject, text, html) {
  // console.log(to, subject, message);
  try {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "rahmanzhalok@gmail.com",
        pass: "ifibrepwqsfbdvcj",
      },
    });

    const mailOptions = {
      from: "rahmanzhalok@gmail.com",
      to: to,
      subject: subject,
      text,
      html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    // return error;
  }
}

// sendMail("zhalokrahman007@gmail.com", "Email verification", "Hello bhaia ");
module.exports = sendMail;
