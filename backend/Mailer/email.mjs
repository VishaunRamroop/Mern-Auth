import { transporter } from "./nodeMailer.mjs";
/*const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });*/ 
import dotenv from 'dotenv';
dotenv.config()
async function sendWelcomeEmail(verificationCode,email) {
  try {
    const welcome = await transporter.sendMail({
        from:`${process.env.USER}`,
        to:`${email}`,
        subject:'Verify Email Address',
        text:"Welcome, please verify your email address",
        html:`your verification code is ${verificationCode}`

    });
    //this works
    //for gmail, i needed a app password
    //create env for it
  } catch (error) {
    console.error(error)
  }
};

async function forgotPasswordSender(resetURL,email){
  try {
    const forgot = await transporter.sendMail({
      from:`${process.env.USER}`,
      to:`${email}`,
      subject:'Reset Password',
      text:"Instructions to reset password",
      html:`click here for reset url ${resetURL}`

  });
  } catch (error) {
    console.error(error)
  }
};

async function resetPasswordSuccessful(email){
try {
  const reset = await transporter.sendMail({
    from:`${process.env.USER}`,
    to:`${email}`,
    subject:'Reset Password Successful',
    text:"Your password has been changed",
    html:`Your password has been recently changed, if you have not made these changes please contact us imediately`
  })
} catch (error) {
  console.error(error)
}
}
export {sendWelcomeEmail,forgotPasswordSender,resetPasswordSuccessful}