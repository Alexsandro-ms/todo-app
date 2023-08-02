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

function sendToken(userName, token) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
      <title>Change your password</title>
      <style>
      </style>
      </head>
      <body>
      <div class="container">
      <img src="https://i.ibb.co/DtVPfjq/title.png" alt="title" border="0" style={{width: 100%}} />
      <h2>Change your password</h2>
      <p>Hi ${userName}, to change the password follow the steps below: </p>
      <p>1. Click on the following link</p>
      <p>2. Enter a new password<p>
      <p>
      <strong>The token will expire in 15 minutes</strong>
      </p>
      <p>TodoList Team</p>
      <p>
      <a href="https://localhost:5173/recover-password/${token}" class="btn">Change your password</a>
      </p>
      </div>
      </body>
      </html>
    `;
}

  
  module.exports = { generateEmailBody, sendToken};