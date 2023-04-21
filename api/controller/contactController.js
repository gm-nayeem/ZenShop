const Contact = require('../models/Contact');
const transporter = require('../config/nodemailer');

const contactController = async () => {
    const {
        username, email, phone, message
    } = req.body;

    if (!username || !email || !phone || !message) {
        return res.status(422).json({ error: "fill all the details" })
    }

    const newContact = new Contact({
        username,
        email,
        message
    });

    try {
        await newContact.save();

        const sendMsg = `
            <div>
                <span>Username: ${username}</span><br />
                <span>Email: ${email}</span><br />
                <span>Phone: ${phone}</span><br />
                <p>Message: ${message}</p>
            </div>
        `

        const mailOptions = {
            from: process.env.SENDER,
            to: process.env.RECEIVER,
            subject: 'Contact Details',
            html: sendMsg
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(201).send({ statusCode: 401, error });
            }
            console.log('Email sent: ' + info.response);
            res.status(201).send({ statusCode: 201, info });
        });

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

}

module.exports = { contactController };