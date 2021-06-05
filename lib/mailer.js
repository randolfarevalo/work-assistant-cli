const nodemailer = require('nodemailer')
const config = require('config')

/**
 * Manages anything regarding mailing
 */
class Mailer {

  constructor(config) {
    this.conf = config;
  }

  async Send(recipient, subject, body, isTest = false) {
    let mailConfig = config.get('Mail') 
    
    console.log('this is the send email function', recipient, subject, body)
    console.log('user:' + this.conf.user)

    // TODO: store sensitive data in vault
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.conf.user,
        pass: this.conf.pass,
        clientId: this.conf.clientId,
        clientSecret: this.conf.clientSecret,
        refreshToken: this.conf.refreshToken
      }
    })

    let mailOptions = {
      from: mailConfig.user,
      to: recipient,
      subject: subject,
      text: body
    }  

    // TODO : improve error handling
    if(isTest)
    {
      console.log('will not send email because this is test mode')
    }
    else 
    {
      transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
          console.log('Error:' + err)
        } else {
          console.log('Email ok!');
        }
      })  
    }
  }
}

module.exports = Mailer;