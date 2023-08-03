function generateEmailBody(userName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
      <title>Welcome to the TodoList App</title>
      <style>
      </style>
      </head>
      <body>
      <div class="container">
      <img src="https://i.ibb.co/DtVPfjq/title.png" alt="title" border="0" style={{width: 100%}} />
      <h2>Welcome to the TodoList App</h2>
      <p>Hi ${userName},</p>
      <p>Welcome to TodoList, the application that will help you organize your tasks and appointments in a simple and efficient way.</p>
      <p>Get started right now and improve your productivity!</p>
      <p>TodoList Team</p>
      <p>
      <a href="https://www.seusite.com/app" class="btn">Go to</a>
      </p>
      </div>
      </body>
      </html>
    `;
}

function sendCode(userName, code) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
      <title>Change your password</title>
      <style>
      .btn {
        text-align: center;
      }
      </style>
      </head>
      <body>
      <div class="container">
      <img src="https://i.ibb.co/DtVPfjq/title.png" alt="title" border="0" style={{width: 100%}} />
      <h2>Change your password</h2>
      <p>Dear Alexsandro Martins,</p>
      <p>
      We noticed that you've requested to reset your password for your TodoList account. To ensure the security of your account, we've generated a unique verification code that you'll need to complete the password reset process.
      </p>
      <p>Your Verification Code: <strong>${code}</strong> (please keep this code private)</p>
      <p>
      To reset your password, follow these steps:
      </p>
      <p>1. Click the link below or copy-paste it into your browser's address bar:</p>
      <a href="http://localhost:5173/recover-password/" class="btn">Change your password</a>
      <p>2. Enter the provided verification code: <strong>${code}</strong><p>
      <p>3. Set a new password for your account.</p>
      <p>
      If you did not request a password reset or believe this email was sent to you in error, please ignore it. Your account will remain secure, and no further action is needed.
      </p>
      <p>Please note that the verification code is only valid for a limited time for security reasons. If you encounter any issues or need assistance, don't hesitate to reach out to our support team at</p>
      <a href="https://www.instagram.com/alexsandrom.s/">Support</a>
      <p>Thank you for using TodoList</p>
      <p>
      Best regards,
      </p>
      <p>
      TodoList Team
      </p>
      </div>
      </body>
      </html>
    `;
}

  
  module.exports = { generateEmailBody, sendCode};