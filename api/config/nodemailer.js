const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USR_EMAIL,
        pass: process.env.USER_PASSWORD
    }
});

module.exports = transporter;