import sendgridMail from '@sendgrid/mail';

/* FORMAT FOR MESSAGE
const message = {
    text: 'hello books',
    html: '<strong>html version</strong>',
    }
*/

const sendMail = (senderMail, receiverMail, message) => {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: receiverMail,
    from: senderMail,
    subject: 'Welcome to iEvent',
    text: 'iEvents',
    ...message
  };
  return sendgridMail.send(msg);
};

export default sendMail;