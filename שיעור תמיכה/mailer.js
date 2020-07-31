var hbs = require('nodemailer-express-handlebars');
//attach the plugin to the nodemailer transporter
transporter.use('compile', hbs(options));
//send mail with options
var mail = {
   from: 'from@domain.com',
   to: 'to@domain.com',
   subject: 'Test',
   template: 'email',
   context: {
       name: 'Name'
   }
}
transporter.sendMail(mail);