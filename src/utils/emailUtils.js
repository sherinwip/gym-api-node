// Placeholder for email service integration
const sendEmail = async ({ to, subject, text }) => {
  // In production, integrate with an email service provider
  console.log('Sending email:', { to, subject, text });
  return Promise.resolve();
};

module.exports = {
  sendEmail
};