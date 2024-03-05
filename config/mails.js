let mails = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
}

const mailOptions = (htmlData, email, subject) => {
    const data = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: subject,
        html: htmlData
    }
}

module.exports = { mails, mailOptions }