import emailjs from "@emailjs/browser";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or another email service
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
        user: "game.store.gurkan@gmail.com",
        pass: "okip vmix lliy giht",
    },
});

const domain = process.env.NEXT_PUBLIC_APP_URL;


export const sendTwoFactorTokenEmail = async(email:string,token:string) => {

    const mailOptions = {
        from: "gurkanmaral1@gmail.com",
        to:email,
        subject:"2FA code",
        text:`Your 2FA code: ${token}`   
    }
    await transporter.sendMail(mailOptions)
  
}

export const sendVerificationEmail = async (
    email:string,
    token:string
) => {

    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Verify Your Email',
        text: `Click this link to verify your email: ${confirmLink}`,
    };

    await transporter.sendMail(mailOptions);
}


export const sendPasswordResetEmail = async (
    email:string,
    token:string
) => {
    const confirmLink = `${domain}/auth/new-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Reset your password',
        text: `Click this link to reset your password: ${confirmLink}`,
    };

    await transporter.sendMail(mailOptions);
}






