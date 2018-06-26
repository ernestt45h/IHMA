const nodemailer = require('nodemailer')
const client = require('../config/client')
const secret = require('../config/secrets')

const mailer = {
    sendMail(html){},
    sendActivation(activation_string, to, next){
        var message = {
            from: 'verify@aihmaai.com',
            to: to,
            subject: 'User Activation',
            html: 
            `
                <h2>Below is the activation link</h2>
                <a href="`+client.name+`/activate/`+activation_string+`">Activate account</a>
            `
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: secret.email_user,
                pass: secret.email_pass
            }
        })

        transporter.sendMail(message, function (err, info) {
            if(err)
              next(err)
            else
              next()
         });
    }
}

module.exports = mailer