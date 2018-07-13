const nodemailer = require('nodemailer')
const client = require('../../config/client')
const auth = require('./config.json')

class Mail {

    from
    to
    subject
    message
    service
    auth = {
        user,
        pass,
    } 
    //contains the "to" "subject" "message" 
    envelope

    constructor(from, to, message, subject){
        this.mail = nodemailer
        //check if message is passed in the constructor
        if(from && to && message && subject){
            this.set_mail(from, to, message, subject)
            .then(()=>{
                this.send_mail();
            })
        }
    }

    /**
     * Sets the message to be sent. 
     * from: where the mail is being sent from
     * to: to whom the mail is intended
     * subject: the title or subject of the mail
     * message: the context of the mail, can be either html or raw text
     * 
     * 
     * @param {string} from 
     * @param {string} to 
     * @param {string} message 
     * @param {string} subject 
     */
    async set_mail(from, to, message='', subject=''){
        if(!to || !from)return {error: 'to and from parameters required'}
        this.envelope = {
            from,
            to,
            subject,
            html: message
        }
    }

    /**
     * Used in sending mail after set_mail has invoked
     */
    send_mail(){
        this.mailer.createTransport({
            service: auth.service,
            auth: {
                user: auth.user,
                pass: auth.pass
            }
        }).sendMail(this.envelope, (err, res)=>{
            if (err) return {error: 'Error sending mail', code: err}
            else return {message: 'Mail sent successfully'}
        })
    }

}

module.exports = Mail